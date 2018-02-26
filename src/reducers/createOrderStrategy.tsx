import * as constants from '../constants';

function form(
    state: any = {
        formState: {
            owner: {
                value: 'x@gmail.com',
            },
            triggerRule: '',
            marketingModel: '',
            strategyTypeAdd: {
                email: '',
                strategyType: [],
            },
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
        getHomePageCount: 0,
        weChatPush: null,
        showOrderDetailCheck: 0,
        saveRule: {
            resultCode: '',
            message: '保存成功',
        }
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
        case constants.GET_HOME_PAGE_COUNT_SUCCESS:
            return {
                ...state,
                getHomePageCount: action.result
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
        case constants.SAVE_RULE_SUCCESS:
            return {
                ...state,
                saveRule: { ...state.saveRule, resultCode: action.result.resultCode, message: action.result.message }
            };
        case constants.SAVE_RULE_FAIL:
            return {
                ...state,
                saveRule: { ...state.saveRule, resultCode: action.error.resultCode, message: action.error.message }
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
        case constants.GET_RESPONSIBLE_SUCCESS:
            return {
                ...state,
                formState: { ...state.formState, strategyTypeAdd: action.result }
            };
        default:
            return state;
    }
}

export const createOrderStrategyReducer = {
    createOrderStrategy: form
};
