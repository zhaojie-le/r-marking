import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
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

const decrementSuccess = (result) => {
    return {
        type: `${constants.INCREMENT_ENTHUSIASM}Success`,
        result: result
    };
};

const decrementFail = (error) => {
    return {
        type: `${constants.INCREMENT_ENTHUSIASM}Fail`,
        error: error
    };
};

const increment: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.INCREMENT_ENTHUSIASM).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`/api/abtest-baseinfo/get-baseinfo-byid`).
                    map((response: {code: number, result: object}) => {
                        if (response.code === 0) {
                            return (incrementSuccess(response.result));
                        } else {
                            return (incrementFail(response));
                        }
                    });
            } 
        );
};

const decrement: Epic<any, any>  = (action$, store) => {
    return action$.ofType(constants.DECREMENT_ENTHUSIASM).
        switchMap(
            (action): Observable<any>  => {
                return ajax.getJSON(`/api/abtest-baseinfo/get-baseinfo-byid`).
                    map((response: {code: number, result: object}) => {
                        if (response.code === 0) {
                            return (decrementSuccess(response.result));
                        } else {
                            return (decrementFail(response));
                        }
                    });
            }
        );
};

const epics = [increment, decrement];

export default epics;