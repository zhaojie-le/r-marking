
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener('message', (e) => {
    var value = e.data.value; 
    var dataList = e.data.dataList; 
    var treeData = e.data.treeData;

    var zkkeys = dataList.map((item) => {
        if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, treeData);
        }
        return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    ctx.postMessage({ zkkeys: zkkeys });
});