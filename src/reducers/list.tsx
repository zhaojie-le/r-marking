import * as actions from '../actions/list';
import { ListState } from '../types/list';

import { EDIT_START, EDIT_STOP, STRATEGY_LIST, STRATEGY_LIST_SUC } from '../constants/list';

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
            case EDIT_START:
                return {...state};
            case EDIT_STOP:
                return {...state};
            default:
                return { ...state };
    }
}

export const ListReducer: RList = {
    list : enthusiasm
};