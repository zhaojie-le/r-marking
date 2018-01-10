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
    strategyType: number;
}

export interface OrderStateParam {
    cateId: number;
    serverIds: string;
}

export interface SaveRule {
    params: any;
    type: constants.SAVE_RULE;
}

export interface SaveModel {
    modelJsonString: string;
    type: constants.SAVE_MODEL;
}

export interface ChangeShowOrderDetailCheck {
    flag: boolean;
    type: constants.CHANGE_SRDC;
}

export interface ServiceParam {
    cateId: number;
    lineId: number;
}

export interface WeChatPushParam {
    lineid: number;
    refer: any;
    orderStatus: any;
}

export interface WeChatPushReturn extends WeChatPushParam {
    type: constants.GET_WHCHATPUSH;
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

export function getWechatPush(sp: WeChatPushParam): WeChatPushReturn {
    return {
        type: constants.GET_WHCHATPUSH ,
        lineid: sp.lineid,
        refer: sp.refer,
        orderStatus: sp.orderStatus,
    };
}

export function getRules(type: number): GetRules {
    return {
        type: constants.GET_RULES,
        strategyType: type,
    };
}

export function saveRule(rjs: any): SaveRule {
    return {
        type: constants.SAVE_RULE,
        params: rjs,
    };
}

export function saveModel(mjs: string): SaveModel {
    return {
        type: constants.SAVE_MODEL,
        modelJsonString: mjs,
    };
}

export function setShowOrderDetailCheck(flag: boolean): ChangeShowOrderDetailCheck {
    return {
        type: constants.CHANGE_SRDC,
        flag: flag,
    };
}

export function resetWeChatPush() {
    return {
        type: constants.RESET_WECHATPUSH
    };
}
