import * as React from 'react';
import _ from 'lodash';
import './style.scss';
import {
    Tree,
    Input,
    Row,
    Col
} from 'antd';
import Worker from 'worker-loader!./worker';

export interface RuleProps {
    form: any;
}

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const treeData: any = [{
    title: '这是测试',
    key: '0-0',
    children: [
        {
            title: '22',
            key: '444444',
            children: [{
                title: '22',
                key: '44445',
                children: [{
                    title: '22',
                    key: '44446',
                    children: [{
                        title: '22',
                        key: '44447',
                        children: [{
                            title: '22',
                            key: '44448',
                            children: [{
                                title: '22',
                                key: 444449,
                            }]
                        }]
                    }]
                }]
            }]
        },
        {
        title: '我也是测试',
        key: '0-0-0',
        children: [{
                title: '还是个测试',
                key: '0-0-0-0'
            },
            {
                title: '为什么还是测试',
                key: '0-0-0-1'
            },
            {
                title: '反正还是测试2',
                key: '0-0-0-2'
            },
        ],
    }, {
        title: '有问题啊',
        key: '0-0-1',
        children: [{
                title: '不是很准确',
                key: '0-0-1-0'
            },
            {
                title: '按照title测试',
                key: '0-0-1-1'
            },
            {
                title: '按照key测试',
                key: '0-0-1-2'
            },
        ],
    }, {
        title: '红色',
        key: '0-0-2',
    }],
}, {
    title: '黄色',
    key: '0-1',
    children: [{
            title: '蓝色',
            key: '0-1-0-0'
        },
        {
            title: '黑色',
            key: '0-1-0-1'
        },
        {
            title: '绿色',
            key: '0-1-0-2'
        },
    ],
}, {
    title: '酒色',
    key: '0-2',
}];

const dataList: Array<any> = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key: key, title: node.title });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(treeData);

var cache: any = [];
function has(tree: any, keys: any) {
    return tree.some(function(item: any, i: number) {
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
    let newTree1: any = tree.filter(function(item: any, i: number) {
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
    newTree1.forEach(function(item: any, i: number) {
        if (item.children) {
            newTree1[i].children = filter(item.children, keys);
        }
    });
    return newTree1;
}

interface Props {
    onChange: (value: any, keys: any) => void;
}
class TreeSelect extends React.Component<Props, any> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            searchValue: '',
            newTreeData: []
        };
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys, e) => {
        let newTreeData = filter(_.cloneDeep(treeData), checkedKeys);
        this.props.onChange(newTreeData, checkedKeys);
        this.setState({ checkedKeys, newTreeData });
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
                dataList: dataList,
                treeData: treeData
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
            return <TreeNode {...item} key={item.key} title={title}/>;
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
            return <TreeNode {...item} key={item.key} title={item.title}/>;
        });
    }

    render() {
        const { autoExpandParent, expandedKeys } = this.state;
        return (
            <div id="treeSelectWrapper">
                <Row>
                    <Col span={12} style={{position: 'relative'}}>
                        <Search style={{ marginBottom: 8, width: '300px', position: 'absolute', top: 0, left: 0 }} placeholder="请输入要搜索的节点" onChange={(e) => { e.persist(); this.onChange(e); }} />
                        <div className="treeSelectBox">
                            <Tree
                                checkable={true}
                                onCheck={this.onCheck}
                                onExpand={this.onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                            >
                                {this.renderTreeNodes(treeData)}
                            </Tree>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Tree>
                                {this.renderSelectTreeNodes()}
                            </Tree>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default TreeSelect;
