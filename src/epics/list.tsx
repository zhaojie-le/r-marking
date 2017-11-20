import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants/list';
import { Observable } from 'rxjs/Rx';
// import { ListResponseType } from '../types';
import 'rxjs';
import { Epic } from 'redux-observable';
// 获取列表页数据成功
const strategyListSuccess = (response) => {
    return {
        type: constants.STRATEGY_LIST_SUC,
        response: response
    };
};

const strategyListFail = (response) => {
    return {
        type: constants.STRATEGY_LIST_FAIL,
        responses: response
    };
};

const editStartSuc = (id) => {
    return {
        type: constants.EDIT_START_SUC,
        id: id
    };
};

const editStartFail = (id) => {
    return {
        type: constants.EDIT_START_FAIL,
        id: id
    };
};

const editStopSuc = (id) => {
    return {
        type: constants.EDIT_STOP_FAIL,
        id: id
    };
};

const editStopFail = (id) => {
    return {
        type: constants.EDIT_STOP_FAIL,
        id: id
    };
};

const editStart: Epic<any, any>  = (action$, store) => {
    return action$.ofType(constants.EDIT_START).
        switchMap(
            (action): Observable<any>  => {
                return ajax.getJSON(`/marketStrategy/list`).
                    map((response: {code: number, result: object}) => {
                        if (response.code === 0) {
                            return (editStartSuc(response));
                        } else {
                            return (editStartFail(response));
                        }
                    });
            }
        );
};

const editStop: Epic<any, any>  = (action$, store) => {
    return action$.ofType(constants.EDIT_STOP).
        switchMap(
            (action): Observable<any>  => {
                return ajax.getJSON(`/marketStrategy/list`).
                    map((response: {code: number, result: object}) => {
                        if (response.code === 0) {
                            return (editStopSuc(response));
                        } else {
                            return (editStopFail(response));
                        }
                    });
            }
        );
};
// 获取列表页列表数据
const strategyList: Epic<any, any, any>  = (action$, store, params) => {
    console.log('ajax', params);
    return action$.ofType(constants.STRATEGY_LIST).
        switchMap(
            (action): Observable<any>  => {
                return ajax.post('/marketStrategy/list', { page: action.params.page,
                                                           pageSize: action.params.pageSize,
                                                           pkId: action.params.pkId,
                                                           activityId: action.params.activityId,
                                                           strategyName: action.params.strategyName,
                                                           strategyState: action.params.strategyState,
                                                           effectiveTime: action.params.effectiveTime,
                                                           invalidTime: action.params.invalidTime,
                                                           strategyType: action.params.strategyType,
                                                           marketingType: action.params.marketingType
                                                        }).
                map(response => {
                    if (response.response.code === 0) {
                        return (strategyListSuccess(response.response));
                    } else {
                        return (strategyListFail(response.response));
                    }
                });
            }
        );
};

const epics = [strategyList,editStart,editStop];

export default epics;