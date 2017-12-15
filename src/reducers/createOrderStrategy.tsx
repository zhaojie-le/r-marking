import * as constants from '../constants';

function form(
    state: any = {
        formState: {
            owner: {
                value: 'x@gmail.com',
            },
            triggerRule: '',
            marketingModel: '',
            orderSource: {
                value: []
            },
            serviceItem: {
                value: []
            },
            serviceOptions: {
                value: []
            },
            city: {
                value: []
            },
            orderState: {
            }
        },
        serviceOptions: [],
        orderState: [],
        rules: [
            {list: [], name: '', title: '', type: ''},
            {list: [], name: '', title: '', type: ''},
            {list: [], name: '', title: '', type: ''},
            {list: [], name: '', title: '', type: ''},
        ],
        weChatPush: null,
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
        case constants.GET_WHCHATPUSH_SUCCESS:
            return {
                ...state,
                weChatPush: {...action.result}
            };
        case constants.SAVE_RULE:
            return {
                ...state,
                formState: { ...state.formState, triggerRule: action.ruleJsonString, }
            };
        case constants.SAVE_MODEL:
            return {
                ...state,
                formState: { ...state.formState, marketingModel: action.modelJsonString, }
            };
        default:
            return state;
    }
}

export const createOrderStrategyReducer = {
    createOrderStrategy: form
};
