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

const getRulesStateSuccess = (result, strategyType) => {
    return {
        type: constants.GET_RULES_SUCCESS,
        strategyType: strategyType,
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

const saveRuleSuccess = (result) => {
    return {
        type: constants.SAVE_RULE_SUCCESS,
        result: result
    };
};

const saveRuleFail = (error) => {
    return {
        type: constants.SAVE_RULE_FAIL,
        error: error
    };
};
// getHomePageCountSuccess ,getHomePageCountFail
const getHomePageCountSuccess = (result) => {
    return {
        type: constants.GET_HOME_PAGE_COUNT_SUCCESS,
        result: result
    };
};
const getResponsibleSuccess = (result) => {
    return {
        type: constants.GET_RESPONSIBLE_SUCCESS,
        result: result
    };
};

const getResponsibleFail = (result) => {
    return {
        type: constants.GET_RESPONSIBLE_FAIL,
        result: result
    };
};

const getHomePageCountFail = (error) => {
    return {
        type: constants.GET_HOME_PAGE_COUNT_FAIL,
        error: error
    };
};
const getService: Epic<any, any, any> = (action$, store) => {
    return action$.ofType(constants.GET_SERVICE).
        switchMap(
        (action): Observable<any> => {
            // if (action && action.serviceType && action.serviceType === 3) {
            //     //   return  this.getServiceSuccess([]);
            //     console.log(11);
            // } else {
            return ajax.getJSON(`marketStrategy/getService?lineId=${action.lineId}&cateId=${action.cateId}`).
                map((response: { resultCode: number, data: any[] }) => {
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
            // }
        }
        );
};

const getOrderState: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_ORDERSTATE).
        switchMap(
        (action): Observable<any> => {
            return ajax.getJSON(`marketStrategy/getOrderState?serverIds=${action.serverIds}&cateId=${action.cateId}`).
                map((response: { resultCode: number, data: any[] }) => {
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
                map((response: { resultCode: number, data?: { name: string; value: string }, message?: string }) => {
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
                map((response: { resultCode: number, data: {} }) => {
                    if (response.resultCode === 1) {
                        return (getRulesStateSuccess(response.data, action.strategyType));
                    } else {
                        return (getRulesStateFail(response));
                    }
                });
        }
        );
};

const saveRule: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.SAVE_RULE).
        switchMap(
        (action): Observable<any> => {
            return ajax.post('/marketStrategy/save', action.params).map(response => {
                if (response.response.resultCode === 1) {
                    window.location.href = 'http://usermarket.daojia-inc.com/';
                    return (saveRuleSuccess(response.response));
                } else {
                    return (saveRuleFail(response.response));
                }
            });
        }
        );
};

const getHomePageCount: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_HOMEPAGECOUNT).
        switchMap(
        (action): Observable<any> => {
            return ajax.getJSON('/marketStrategy/getHomePageCount').map((response: { resultCode: number, data: {}, message?: string }) => {
                if (response.resultCode === 1) {
                    return (getHomePageCountSuccess(response.data));
                } else {
                    return (getHomePageCountFail(response));
                }
            });
        }
        );
};

const getResponsible: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.GET_RESPONSIBLE).
        switchMap(
        (action): Observable<any> => {
            return ajax.post('/marketStrategy/toAdd').map(response => {
                if (response.response.resultCode === 1) {
                    return (getResponsibleSuccess(response.response.data));
                } else {
                    return (getResponsibleFail(response.response));
                }
            });
        }
        );
};

const epics = [getService, getOrderState, getRules, getWechatPush, saveRule, getHomePageCount, getResponsible];

export default epics;
