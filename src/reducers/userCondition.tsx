import * as constants from '../constants';

function form(
    state: any = {
        totalUser: 0,
        tagNodeTree: [],
        tagNodeTreeZ: [
            { 'isParent': true, 'Description': '最简单', 'title': '新客----最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。', 'key': '00-01-23', 'Disable': true },
            { 'isParent': true, 'Description': '最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。', 'title': '老客----最简单的用法，展示可勾选，可选中，禁用，默认展开等功能', 'key': '00-01-24', 'Disable': true }
        ],
    },
    action: any
) {
    switch (action.type) {
        case constants.TAG_NODE_TREE:
            return {
                ...state
            };
        case constants.TAG_NODE_TREE_SUC:
            return {
                ...state, tagNodeTree: action.list
            };
        case constants.USER_AMOUNT_SUC:
            return {
                ...state, totalUser: action.count
            };
        default:
            return state;
    }
}
export const userCondition = {
    userCondition: form
};
