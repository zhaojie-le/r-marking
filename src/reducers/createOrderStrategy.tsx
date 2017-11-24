import * as constants from '../constants';

function form( 
    state: any = {
        formState: {
            owner: {
                value: 'x@gmail.com',
            },
            triggerRule: ''
        },
        serviceOptions: [],
        orderState: [],
        rules: [
            {list: [], name: '', title: '', type: ''}, 
            {list: [], name: '', title: '', type: ''},
            {list: [], name: '', title: '', type: ''},
            {list: [], name: '', title: '', type: ''},
        ],
    },
    action: any
) {
    switch (action.type) {
        case constants.CHANGE_FIELD:
            return {
                ...state,
                formState: { ...state.formState, ...action.payload, }
            };
        case constants.GET_SERVICE_SUCCESS:
            return {
                ...state,
                serviceOptions: [...action.result]
            };
        case constants.GET_ORDERSTATE_SUCCESS:
            return {
                ...state,
                orderState: [...action.result]
            };
        case constants.GET_RULES_SUCCESS:
            return {
                ...state,
                rules: [...action.result]
            };
        case constants.SAVE_RULE:
            return {
                ...state,
                formState: { ...state.formState, triggerRule: action.ruleJsonString, }
            };
        default:
            return state;
    }
}

export const createOrderStrategyReducer = {
    createOrderStrategy: form
};