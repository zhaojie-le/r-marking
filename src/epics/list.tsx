import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import { ListResponseType } from '../types';
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

// 获取列表页列表数据
const strategyList: Epic<any, any, any>  = (action$, store) => {
    return action$.ofType(constants.STRATEGY_LIST).
        switchMap(
            (action): Observable<any>  => {
                console.log('ajax', action.params);
                return ajax.getJSON(`/marketStrategy/list? page = ${action.params.pkId ? action.params.page : ''}`).
                    map((response: ListResponseType) => {
                            if (response.code === 0) {
                                return (strategyListSuccess(response));
                            } else {
                                return (strategyListFail(response));
                            }
                    });
            }
        );
};

const epics = [ strategyList];

export default epics;