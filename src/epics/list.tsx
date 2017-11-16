import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import { ListResponseType } from '../types';
import 'rxjs';
import { Epic } from 'redux-observable';

const incrementSuccess = (result) => {
    return {
        type: `${constants.INCREMENT_ENTHUSIASM}Success`,
        result: result
    };
};

const incrementFail = (error) => {
    return {
        type: `${constants.INCREMENT_ENTHUSIASM}Fail`,
        error: error
    };
};

// const decrementSuccess = (result) => {
//     return {
//         type: `${constants.INCREMENT_ENTHUSIASM}Success`,
//         result: result
//     };
// };

// const decrementFail = (error) => {
//     return {
//         type: `${constants.INCREMENT_ENTHUSIASM}Fail`,
//         error: error
//     };
// };
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


const increment: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.INCREMENT_ENTHUSIASM).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`/marketStrategy/list`).
                    map((response: {code: number, data: object}) => {
                        if (response.code === 0) {
                            return (incrementSuccess(response));
                        } else {
                            return (incrementFail(response));
                        }
                    });
            } 
        );
};

// const decrement: Epic<any, any>  = (action$, store) => {
//     return action$.ofType(constants.DECREMENT_ENTHUSIASM).
//         switchMap(
//             (action): Observable<any>  => {
//                 return ajax.getJSON(`/marketStrategy/list`).
//                     map((response: {code: number, result: object}) => {
//                         if (response.code === 0) {
//                             return (decrementSuccess(response));
//                         } else {
//                             return (decrementFail(response));
//                         }
//                     });
//             }
//         );
// };
// 获取列表页列表数据
const strategyList: Epic<any, any, any>  = (action$, store, params) => {
    return action$.ofType(constants.STRATEGY_LIST).
        switchMap(
            (action): Observable<any>  => {
                return ajax.getJSON(`/marketStrategy/list`).
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

const epics = [increment, strategyList];

export default epics;