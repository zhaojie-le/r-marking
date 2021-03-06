import * as actions from '../actions';
import { ListState } from '../types/list';

import { 
        EDIT_START, 
        EDIT_START_SUC, 
        EDIT_STOP, 
        EDIT_STOP_SUC, 
        STRATEGY_LIST, 
        STRATEGY_LIST_SUC 
    } from '../constants';

interface RList { list: (state: ListState, action: actions.EnthusiasmAction) => ListState; }

function enthusiasm(
    state: ListState = {
        params: {
            page: 1,
            pageSize: 10,
            pkId: '',           // 策略ID
            activityId: '',     // 活动ID
            strategyName: '',   // 策略名称
            strategyState: -1,   // 策略状态
            effectiveTime: '',  // 起始时间
            invalidTime: '',    // 结束时间
            strategyType: -1,    // 触发事件
            marketingType: -1    // 营销类型
        },
        data: {}, 
        listData: [], 
        totalInfo: 0,           // 列表总条数
        editStartId: '',        // 列表开启id
        editStopId: '',         // 列表暂停id
        editStartInx: -1,       // 列表数据启动下标
        editStopInx: -1         // 列表数据暂停下标
    }, 
    action: actions.EnthusiasmAction
): ListState {
        switch (action.type) {
            case STRATEGY_LIST:
                return { ...state, params: action.params};
            case STRATEGY_LIST_SUC:               
                return {...state, data: action.response, listData: action.response.list, totalInfo: action.response.totalInfo};
            case EDIT_START:
                return {...state, editStartInx: action.inx, editStartId: action.id};
            case EDIT_START_SUC:
                let startArray = state.listData;
                startArray.splice(state.editStartInx, 1, action.item);
                console.log('changelist', startArray);
                return {...state, listData: startArray};
            case EDIT_STOP:
                return {...state, editStopInx: action.inx, editStopId: action.id};
            case EDIT_STOP_SUC:
                let stopArray = state.listData;
                stopArray.splice(state.editStopInx, 1, action.item);
                return {...state, listData: stopArray};
            default:
                return { ...state };
    }
}

export const ListReducer: RList = {
    list : enthusiasm
};