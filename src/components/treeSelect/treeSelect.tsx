import * as React from 'react';
import _ from 'lodash';
import './style.scss';
import {
    Tree,
    Input
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

let newTree = treeData;
let cs = 0;
for ( let u = 0; u < 3000; u++) {
    newTree[0].children.push({
        title: '22' + cs ,
        key: '' + u
    });
    if ((cs = u % 600) === 0) {
        newTree = newTree[0].children;
    }
}

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

class TreeSelect extends React.Component {
    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
        searchValue: ''
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        });
    }
    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys
        });
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
    render() {
        return (
            <div>
                <Search style={{ marginBottom: 8, width: '300px' }} placeholder="请输入要搜索的节点" onChange={(e) => { e.persist(); this.onChange(e); }} />
                <Tree
                    checkable={true}
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect}
                    autoExpandParent={true}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
            </div>

        );
    }
}

export default TreeSelect;
