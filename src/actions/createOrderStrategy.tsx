import * as constants from '../constants';

export interface ChangeField {
    type: constants.CHANGE_FIELD;
    payload: any;
}

export interface Filed {
    value: any;
    name: string;
    [propName: string]: any;
}

export interface GetService {
    type: constants.GET_SERVICE;
    lineId: number;
    cateId: number;
}

export interface GetOrderState {
    type: constants.GET_ORDERSTATE;
    serverIds: string;
    cateId: number;
}

export interface GetRules {
    type: constants.GET_RULES;
    strategyType: 1;
}

export interface OrderStateParam {
    cateId: number;
    serverIds: string;
}

export interface ServiceParam {
    cateId: number;
    lineId: number;
}

export type ChangeFieldType = ChangeField;

export function changeField(fields: Filed): ChangeField {
    return {
        type: constants.CHANGE_FIELD,
        payload: fields,
    };
}

export function getService(sp: ServiceParam): GetService {
    return {
        type: constants.GET_SERVICE ,
        lineId: sp.lineId,
        cateId: sp.cateId,
    };
}

export function getOrderState(sp: OrderStateParam): GetOrderState {
    return {
        type: constants.GET_ORDERSTATE ,
        serverIds: sp.serverIds,
        cateId: sp.cateId,
    };
}

export function getRules(): GetRules {
    return {
        type: constants.GET_RULES,
        strategyType: 1,
    };
}