import * as constants from '../constants';

function form(
    state: any = {
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
                ...state, pageName: action.name
            };
        case constants.USER_AMOUNT_SUC:
            return {
                ...state, userCount: action.num
            };
        default:
            return state;
    }
}
export const userCondition = {
    userCondition: form
};