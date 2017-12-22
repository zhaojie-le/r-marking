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
        default:
            return state;
    }
}
export const strategyRules = {
    strategyRules: form
};