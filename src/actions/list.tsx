
import * as constants from '../constants/list';
import { ListResponseType } from '../types';


export interface StrategyList {
    type: constants.STRATEGY_LIST;
    params: any;
}

export interface StrategyListSuccess {
    type: constants.STRATEGY_LIST_SUC;
    response: ListResponseType;
}

export interface EditStart {
    type: constants.EDIT_START;
    id: string;
}

export interface EditStop {
    type: constants.EDIT_STOP;
    id: string;
}

export type EnthusiasmAction =  StrategyList | StrategyListSuccess | EditStart | EditStop;

// 获取列表数据
export function StrategyList(params: any): StrategyList {
    return {
        type: constants.STRATEGY_LIST,
        params: params
    };
}
// 列表数据获取成功
export function StrategyListSuccess(response: ListResponseType): StrategyListSuccess {
    return {
        type: constants.STRATEGY_LIST_SUC,
        response: response
    };
}

export function EditStart(id: string): EditStart {
    return {
        type: constants.EDIT_START,
        id: id
    };
}

export function EditStop(id: string): EditStop {
    return {
        type: constants.EDIT_STOP,
        id: id
    };
}
