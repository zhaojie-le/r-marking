import * as constants from '../constants';

function form(
    state: any = {
        rule: {
            pageName: 0,
            message: ''
        }

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
                ...state, rule: { pageName: action.name }
            };
        case constants.PAGE_NAME_FAIL:
            return {
                ...state, rule: { message: action.error }
            };
        case constants.USER_COUNT_SUC:
            return {
                ...state, rule: { userCount: action.num }
            };
        case constants.USER_AMOUNT_FAIL:
            return {
                ...state, rule: { message: action.error }
            };
        default:
            return state;
    }
}
export const strategyRules = {
    strategyRules: form
};