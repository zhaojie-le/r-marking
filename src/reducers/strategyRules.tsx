import * as constants from '../constants';

function form(
    state: any = {
        pageName: 0,
        message: ''
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
        case constants.PAGE_NAME_FAIL:
            return {
                ...state, message: action.error
            };
        case constants.USER_COUNT_SUC:
            return {
                ...state, userCount: action.num
            };
        case constants.USER_AMOUNT_FAIL:
            return {
                ...state, message: action.error
            };
        default:
            return state;
    }
}
export const strategyRules = {
    strategyRules: form
};