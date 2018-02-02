import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../actions';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import './style.scss';
import {
    Tree,
    Input,
    InputNumber,
    Row,
    Col
} from 'antd';
import Worker from 'worker-loader!./worker';

export interface RuleProps {
    form: any;
}

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
let dataList: Array<any> = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key: key, title: node.title });
        if (node.children) {
            generateList(node.children);
        }
    }
    return dataList;
};

var cache: any = [];
function has(tree: any, keys: any) {
    return tree.some(function (item: any, i: number) {
        if (keys.includes(item.key)) {
            return true;
        }
        if (cache.includes(item.key)) {
            cache.splice(cache.indexOf(item.key), 1);
            return true;
        }
        if (item.children) {
            var rs = has(item.children, keys);
            if (rs) {
                cache.push(item.key);
            }
            return has(item.children, keys);
        }
        return false;
    });
}

function filter(tree: any, keys: any) {
    let newTree1: any = tree.filter(function (item: any, i: number) {
        if (keys.includes(item.key)) {
            return true;
        }
        if (item.children) {
            let flag = false;
            flag = has(item.children, keys);
            if (cache.includes(item.key)) {
                cache.splice(cache.indexOf(item.key), 1);
            }
            return flag;
        }
        return false;
    });
    newTree1.forEach(function (item: any, i: number) {
        if (item.children) {
            newTree1[i].children = filter(item.children, keys);
        }
    });
    return newTree1;
}

interface Props {
    onChange: (value: any) => void;
    totalUser: number;
    tagNodeTree: Array<any>;
    onGetUserAmount: (tag: any[]) => void;
    onGettagNodeTree: (id: string) => void;

}
class TreeSelect extends React.Component<Props, any> {
    private value: any = { triggerChange: 1, newTreeData: [] };
    private dataList: Array<any> = [];
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            expandedKeys: [],
            expandedKeysChild: [],
            autoExpandParent: true,
            searchValue: '',
            newTreeData: [],
            checkedKeys: [],
            treeData: this.props.tagNodeTree,
            autoExpandParentChild: true
        };
        this.dataList = generateList(this.props.tagNodeTree);
    }

    onExpand = (expandedKeysChild) => {
        this.setState({
            expandedKeysChild,
            autoExpandParent: false,
        });
    }
    onExpandChild = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParentChild: false,
        });
    }
    onCheck = (checkedKeys, e) => {
        let tag = checkedKeys;
        this.props.onGetUserAmount(tag);
        let newTreeData = filter(_.cloneDeep(this.props.tagNodeTree), checkedKeys);
        this.value.newTreeData = newTreeData;
        this.triggerChange({ newTreeData });
        this.setState({ checkedKeys, newTreeData });
    }

    onZqChange = (value) => {
        const triggerChange = value;
        this.value.triggerChange = triggerChange;
        this.triggerChange({ triggerChange });
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.value, changedValue));
        }
    }

    onChange = _.debounce(
        (e) => {
            e.persist();
            const value = e.target.value;
            var worker = new Worker();
            worker.onmessage = (e1) => {
                var data = e1.data;
                this.setState({
                    expandedKeys: data.zkkeys,
                    searchValue: value,
                    autoExpandParent: true,
                });
                worker.terminate();
            };
            var messageData = {
                value: value,
                dataList: this.dataList,
                treeData: this.props.tagNodeTree
            };
            worker.postMessage(messageData);
        },
        1000
    );

    renderTreeNodes = (data) => {
        const { searchValue } = this.state;
        return data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.title}</span>;

            if (item.children) {
                return (
                    <TreeNode title={title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} key={item.key} title={title} />;
        });
    }
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                this.props.onGettagNodeTree(treeNode.props.eventKey);
                // [
                // { 'isParent': true, 'Description': '最简单', 'title': '新客----最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。', 'key': '00-01-23', 'Disable': true },
                // { 'isParent': true, 'Description': '最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。', 'title': '老客----最简单的用法，展示可勾选，可选中，禁用，默认展开等功能', 'key': '00-01-24', 'Disable': true }
                // ]
                treeNode.props.dataRef.children = this.props.tagNodeTree;
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            },
                1000
            );
        });
    }
    renderSelectTreeNodes = () => {
        const { newTreeData } = this.state;
        return newTreeData.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} key={item.key} title={item.title} disableCheckbo={item.key === 1 ? false : true} />;
        });
    }
    renderTreeNode = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNode(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} key={item.key} disableCheckbox={item.key === '1-0' ? true : false} />;
        });
    }
    render() {
        const { autoExpandParent, checkedKeys } = this.state;
        return (
            <div id="treeSelectWrapper">
                <Row>
                    <Col>
                        根据组合条件共筛选<span style={{ color: 'red' }}>{this.props.totalUser}</span>用户
</Col>
                </Row>
                <Row>
                    <Col span={12} style={{ position: 'relative' }}>
                        <Search style={{ marginBottom: 8, width: '300px', position: 'absolute', top: 0, left: 0 }} placeholder="请输入要搜索的节点" onChange={(e) => { e.persist(); this.onChange(e); }} />
                        <div className="treeSelectBox">
                            <Tree
                                checkable={true}
                                showLine={true}
                                loadData={this.onLoadData}
                                onExpand={this.onExpand}
                                checkedKeys={checkedKeys}
                                onCheck={this.onCheck}
                                autoExpandParent={autoExpandParent}
                            // defaultCheckedKeys={['1', '0-0-1']}
                            >
                                {this.renderTreeNode(this.state.treeData)}
                            </Tree>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hadSelect">
                            <Tree
                                autoExpandParent={true}
                                onExpand={this.onExpandChild}
                            >
                                {this.renderSelectTreeNodes()}
                            </Tree>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label style={{ verticalAlign: 'middle' }}>推送周期</label>
                        <InputNumber style={{ width: '100px', verticalAlign: 'middle', marginLeft: '20px' }} onChange={this.onZqChange} defaultValue={1} min={1} />
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        totalUser: state.userCondition.totalUser,
        tagNodeTree: state.userCondition.tagNodeTree,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<actions.UserAction>) => bindActionCreators(
    {
        onGettagNodeTree: actions.tagNodeTree,
        onGetOrderState: actions.getOrderState,
        onGetUserAmount: actions.getUserAmount
    },
    dispatch
);

export default connect<any, any, { onChange: (value: any) => void }>(mapStateToProps, mapDispatchToProps)(TreeSelect as any);