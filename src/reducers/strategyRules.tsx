import * as constants from '../constants';

function form(
    state: any = {
        pageName: 0
    },
    action: any
) {
    switch (action.type) {
        case constants.PAGE_NAME:
            return {
                ...state
            };
        case constants.PAGE_NAME_SUC:
            return {
                ...state, pageName: action.name
            };
        case constants.USER_COUNT_SUC:
            return {
                ...state, userCount: action.num
            };
        default:
            return state;
    }
}
export const strategyRules = {
    strategyRules: form
};