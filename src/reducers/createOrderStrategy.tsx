import * as constants from '../constants';

function form(
    state: any = {
        formState: {
            owner: {
                value: 'x@gmail.com',
            },
            triggerRule: '',
            marketingModel: '',
            delayTime: {
                value: { day: 0, minute: 0 }
            },
            pushTimes: {
                value: '0'
            },
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
        rules: {
            strategyType: null,
            settings: {
                orderSource: {
                    list: []
                },
                refer: {
                    list: []
                },
                city: {
                    list: []
                },
                orderStatus: {},
                serviceType: {
                    list: []
                }
            }
        },
        weChatPush: null,
        showOrderDetailCheck: 0
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
                rules: { strategyType: action.strategyType, ruleHadBack: true, settings: action.result }
            };
        case constants.GET_WHCHATPUSH_SUCCESS:
            return {
                ...state,
                weChatPush: { ...action.result }
            };
        case constants.RESET_WECHATPUSH:
            return {
                ...state,
                weChatPush: null
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
        case constants.CHANGE_SRDC:
            return {
                ...state,
                showOrderDetailCheck: action.number
            };
        default:
            return state;
    }
}

export const createOrderStrategyReducer = {
    createOrderStrategy: form
};
