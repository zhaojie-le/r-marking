import * as constants from '../constants';

function form(
    state: any = {

    },
    action: any
) {
    switch (action.type) {
        case constants.PAGE_NAME:
            return {
                ...state
            };
        default:
            return state;
    }
}
export const strategyRules = {
    strategyRules: form
};