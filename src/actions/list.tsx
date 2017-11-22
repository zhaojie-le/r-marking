
import * as constants from '../constants';


export interface StrategyList {
    type: constants.STRATEGY_LIST;
    params: any;
}

export interface StrategyListSuccess {
    type: constants.STRATEGY_LIST_SUC;
    response: any;
}

export interface EditStart {
    type: constants.EDIT_START;
    id: string;
    inx: number;
}
export interface EditStartSuc {
    type: constants.EDIT_START_SUC;
    item: any;
    inx: number;
}

export interface EditStop {
    type: constants.EDIT_STOP;
    id: string;
    inx: number;
}
export interface EditStopSuc {
    type: constants.EDIT_STOP_SUC;
    item: any;
    inx: number;
}
export type EnthusiasmAction =  StrategyList | StrategyListSuccess | EditStart | EditStop | EditStartSuc | EditStopSuc;

// 获取列表数据
export function StrategyList(params: any): StrategyList {
    return {
        type: constants.STRATEGY_LIST,
        params: params
    };
}
// 列表数据获取成功
export function StrategyListSuccess(response: any): StrategyListSuccess {
    return {
        type: constants.STRATEGY_LIST_SUC,
        response: response
    };
}

export function EditStart(id: string, index: number): EditStart {
    return {
        type: constants.EDIT_START,
        id: id,
        inx: index
    };
}

export function EditStartSuc(item: any, inx: number): EditStartSuc {
    return {
        type: constants.EDIT_START_SUC,
        item: item,
        inx: inx
    };
}

export function EditStop(id: string, index: number): EditStop {
    return {
        type: constants.EDIT_STOP,
        id: id,
        inx: index
    };
}
export function EditStopSuc(item: any, inx: number): EditStopSuc {
    return {
        type: constants.EDIT_STOP_SUC,
        item: item,
        inx: inx
    };
}