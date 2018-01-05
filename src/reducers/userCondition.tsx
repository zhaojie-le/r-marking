import * as constants from '../constants';

function form(
    state: any = {
        totalUser: 0,
        tagNodeTree: []
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
