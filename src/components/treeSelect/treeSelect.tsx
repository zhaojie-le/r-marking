import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../actions';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import './style.scss';
import {
    Tree,
    InputNumber,
    Row,
    Checkbox,
    Col
} from 'antd';
// import Worker from 'worker-loader!./worker';
export interface RuleProps {
    form: any;
}

const TreeNode = Tree.TreeNode;
// const Search = Input.Search;
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

const filterarr = (arr) => {
    arr.forEach(function (v: any) {
        arr.forEach(function (item: any, j: any) {
            if (item.indexOf(v) > -1 && v !== item) {
                arr.splice(j, 1, '');
            }
        });
    });
    let i: any;
    for (i = arr.length - 1; i > 0; i--) {
        if (arr[i] === '') {
            arr.splice(i, 1);
        }
    }
    return arr.join(',');
};

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

const yuanObj = {};
const arrToObj = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        yuanObj[item.key] = item;
        if (item.children) {
            arrToObj(item.children);
        }
    }
};

interface Props {
    onChange: (value: any) => void;
    totalUser: number;
    tagNodeTree: Array<any>;
    tagNodeTreeZ: Array<any>;
    onGetUserAmount: (tag: any[]) => void;
    onGettagNodeTree: (id: string) => void;
    strategyType: number;
}
class TreeSelect extends React.Component<Props, any> {
    private value: any = { triggerChange: 1, newTreeData: [] };
    // private dataList: Array<any> = [];
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            expandedKeys: [],
            expandedKeysChild: [],
            autoExpandParent: true,
            searchValue: '',
            newTreeData: [],
            checkedKeys: [],
            treeData: [],
            checked: false,
            autoExpandParentChild: true
        };
        this.state = { ...this.state, treeData: this.props.tagNodeTree };

        // this.dataList = generateList(this.props.tagNodeTree);
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
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    onCheck = (checkedKeys, e: { checked: any, checkedNodes: any, node: any, event: any }) => {
        let tag = checkedKeys;
        console.log('checkedKeys======' + checkedKeys);
        this.props.onGetUserAmount(tag);
        let newTreeData = filter(_.cloneDeep(this.props.tagNodeTree), checkedKeys);
        this.value.newTreeData = newTreeData;
        this.triggerChange({ newTreeData });
        this.setState({ checkedKeys, newTreeData, checked: false });
        arrToObj(newTreeData);
        let filterkeys = filterarr(checkedKeys);
        let filterarrs = filterkeys.split(',');
        let seledObjs: any = [];
        for (let i = 0; i < filterarrs.length; i++) {
            seledObjs.push(yuanObj[filterarrs[i]].nodeUniqueId);
        }
        console.log('seledObjs=========================' + seledObjs);
        console.log('newTreeData===' + JSON.stringify(newTreeData));
        console.log('filterkeys====================' + filterkeys);
    }

    onZqChange = (value) => {
        const triggerChange = value;
        this.value.triggerChange = triggerChange;
        this.triggerChange({ triggerChange });
    }
    onUnloginChange = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === true) {
            this.setState({ checkedKeys: [], newTreeData: [], checked: true });
        } else {
            this.setState({ checked: false });
        }
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.value, changedValue));
        }
    }
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
            let xhr = new XMLHttpRequest();
            xhr.open('get', '/marketStrategy/getTagNodeTree?id=' + treeNode.props.eventKey, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.withCredentials = true; // 支持跨域发送cookies  
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    // 一般会返回JSON或XML数据格式  
                    if (xhr.status === 200) {
                        var responseText = JSON.parse(xhr.responseText);
                        treeNode.props.dataRef.children = responseText.list;
                        this.setState({
                            treeData: [...this.state.treeData],
                        });
                        resolve();
                    } else {
                        console.log('请求失败');
                    }

                }
            };
            xhr.send();
            // fetch('/marketStrategy/getTagNodeTree?id=' + treeNode.props.eventKey, {
            //     method: 'GET',
            // }).then((res: Response) => {
            //     if (res.ok) {
            //         res.json().then((data: any) => {
            //             treeNode.props.dataRef.children = data.list;
            //             this.setState({
            //                 treeData: [...this.state.treeData],
            //             });
            //             resolve();
            //         });
            //     } else {
            //         console.log('Looks like the response wasnt perfect, got status', res.status);
            //     }
            // });
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
            console.log('item=======================' + JSON.stringify(item));
            // disableCheckbox={item.key === 1 ? false : true}
            return <TreeNode {...item} key={item.key} title={item.title} />;
        });
    }
    renderTreeNode = (data) => {
        console.log('data=========' + JSON.stringify(data));
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNode(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} ccc={4} key={item.key} disableCheckbox={item.key === '1-0' ? true : false} />;
        });
    }
    render() {
        const { autoExpandParent, checkedKeys } = this.state;
        console.log('this.state.treeDataKKKKKKKKKKKKK=================================' + JSON.stringify(this.state.treeData));

        return (
            <div id="treeSelectWrapper">
                {this.props.strategyType === 7 || this.props.strategyType === 8 || this.props.strategyType === 9 ?
                    <Row>
                        <Col span={5}>
                            <Checkbox onChange={this.onUnloginChange} checked={this.state.checked}>未登录用户</Checkbox>
                        </Col>
                        <Col span={10}>
                            <p style={{ color: 'red' }}>*针对未登录用户，未登录用户无用户画像</p>
                        </Col>
                    </Row> : null
                }
                <Row>
                    <Col>
                        根据组合条件共筛选<span style={{ color: 'red' }}>{this.props.totalUser}</span>用户
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{ position: 'relative' }}>
                        {/* <Search style={{ marginBottom: 8, width: '300px', position: 'absolute', top: 0, left: 0 }}
                         placeholder="请输入要搜索的节点" onChange={(e) => { e.persist(); this.onChange(e); }} /> */}
                        <div className="treeSelectBox">
                            {this.state.treeData.length > 0 ?
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
                                </Tree> : null}
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
                {this.props.strategyType !== undefined && this.props.strategyType !== 0 ?
                    null :
                    <Row>
                        <Col>
                            <label style={{ verticalAlign: 'middle' }}>推送周期</label>
                            <InputNumber style={{ width: '100px', verticalAlign: 'middle', marginLeft: '20px' }} onChange={this.onZqChange} defaultValue={1} min={1} />
                        </Col>
                    </Row>
                }

            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        totalUser: state.userCondition.totalUser,
        tagNodeTree: state.userCondition.tagNodeTree,
        tagNodeTreeZ: state.userCondition.tagNodeTreeZ
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

export default connect<any, any, { onChange: (value: any) => void, strategyType: number; }>(mapStateToProps, mapDispatchToProps)(TreeSelect as any);