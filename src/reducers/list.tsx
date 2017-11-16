import * as actions from '../actions/list';
import { ListState } from '../types/list';

import { INCREMENT_ENTHUSIASM, 
        DECREMENT_ENTHUSIASM, 
        STRATEGY_LIST, 
        STRATEGY_LIST_SUC, 
        CHANGE_PARAMS,
        CHANGE_PAGE
    } from '../constants/index';

interface RList { list: (state: ListState, action: actions.EnthusiasmAction) => ListState; }

function enthusiasm(state: ListState = { 
        enthusiasmLevel: 1, 
        languageName: 'marketing', 
        listData: [], 
        totalInfo: 0,
        page: 0,              // 发送请求页数
        pageSize: 10,         // 每页列表条数
        pkId: '',             // 策略ID
        activityId: '',       // 活动ID
        strategyName: '',     // 策略名称
        strategyState: '',    // 策略状态
        effectiveTime: '',    // 起始时间
        invalidTime: '',      // 结束时间
        strategyType: 0,      // 触发事件
        marketingType: 0      // 营销类型 
    }, action: actions.EnthusiasmAction): ListState {
        switch (action.type) {
            case STRATEGY_LIST:
                return { ...state};
            case STRATEGY_LIST_SUC:               
                return {...state, listData: action.response.data, totalInfo: action.response.totalInfo};
            case INCREMENT_ENTHUSIASM:
                return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
            case DECREMENT_ENTHUSIASM:
                return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
            case CHANGE_PARAMS:
                return {...state};
            case CHANGE_PAGE:
                return {...state, page: state.page + 1};
            default:
                return { ...state };
    }
}

export const ListReducer: RList = {
    list : enthusiasm
};