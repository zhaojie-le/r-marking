import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs';
import { Epic } from 'redux-observable';

const getServiceSuccess = (result) => {
    return {
        type: constants.GET_SERVICE_SUCCESS,
        result: result
    };
};

const getServiceFail = (error) => {
    return {
        type: constants.GET_SERVICE_FAIL,
        error: error
    };
};

const getOrderStateSuccess = (result) => {
    return {
        type: constants.GET_ORDERSTATE_SUCCESS,
        result: result
    };
};

const getOrderStateFail = (error) => {
    return {
        type: constants.GET_ORDERSTATE_FAIL,
        error: error
    };
};

const getRulesStateSuccess = (result) => {
    return {
        type: constants.GET_RULES_SUCCESS,
        result: result
    };
};

const getRulesStateFail = (error) => {
    return {
        type: constants.GET_RULES_FAIL,
        error: error
    };
};

const getWechatPushSuccess = (result) => {
    return {
        type: constants.GET_WHCHATPUSH_SUCCESS,
        result: result
    };
};

const getWechatPushFail = (error) => {
    return {
        type: constants.GET_WHCHATPUSH_FAIL,
        error: error
    };
};

const getService: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_SERVICE).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`marketStrategy/getService?lineId=${action.lineId}&cateId=${action.cateId}`).
                    map((response: {resultCode: number, data: any[]}) => {
                        if (response.resultCode === 1) {
                            const serviceOptions = response.data.map((item) => {
                                return {
                                    title: item.label,
                                    key: item.value.id,
                                    val: item.value.val
                                };
                            });
                            return (getServiceSuccess(serviceOptions));
                        } else {
                            return (getServiceFail(response));
                        }
                    });
            }
        );
};

const getOrderState: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_ORDERSTATE).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`marketStrategy/getOrderState?serverIds=${action.serverIds}&cateId=${action.cateId}`).
                    map((response: {resultCode: number, data: any[]}) => {
                        if (response.resultCode === 1) {
                            return (getOrderStateSuccess(response.data));
                        } else {
                            return (getOrderStateFail(response));
                        }
                    });
            }
        );
};

const getWechatPush: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_WHCHATPUSH).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`marketStrategy/getWechatPush`).
                    map((response: {resultCode: number, data?: { name: string; value: string }, message?: string }) => {
                        if (response.resultCode === 1) {
                            return (getWechatPushSuccess(response.data));
                        } else {
                            return (getWechatPushFail(response));
                        }
                    });
            }
        );
};

const getRules: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_RULES).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`marketStrategy/getRule?strategyType=${action.strategyType}`).
                    map((response: {resultCode: number, data: any[]}) => {
                        if (response.resultCode === 1) {
                            response.data[1] = response.data[1].list.map((item) => {
                                const newItem:  { label: string; value: string; } = {
                                    label: item.label,
                                    value: item.value,
                                };
                                return newItem;
                            });
                            return (getRulesStateSuccess(response.data));
                        } else {
                            return (getRulesStateFail(response));
                        }
                    });
            }
        );
};

const epics = [getService, getOrderState, getRules, getWechatPush];

export default epics;
