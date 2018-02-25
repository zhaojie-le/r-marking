import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs';
import { Epic } from 'redux-observable';

const pageNameSuccess = (name) => {
    return {
        type: constants.PAGE_NAME_SUC,
        name: name
    };
};

const pageNameFail = (error) => {
    return {
        type: constants.PAGE_NAME_FAIL,
        error: error
    };
};

const userCountSuccess = (num) => {
    return {
        type: constants.USER_COUNT_SUC,
        num: num
    };
};

const userCountFail = (error) => {
    return {
        type: constants.USER_COUNT_FAIL,
        error: error
    };
};

const pageName: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.PAGE_NAME).
        switchMap(
        (action): Observable<any> => {
            return ajax.getJSON(`/marketStrategy/getPageInfo?pageId=${action.pageId}`).
                map((response: { resultCode: number, pageName?: string, message?: string }) => {
                    if (response.resultCode === 1) {
                        return (pageNameSuccess(response.pageName));
                    } else {
                        return (pageNameFail(response.message));
                    }
                });
        }
        );
};

const userCount: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.USER_COUNT).
        switchMap(
        (action): Observable<any> => {
            return ajax.getJSON(`/marketStrategy/getUserCount?userBatchId=${action.patchId}`).
                map((response: { resultCode: number, data?: number, message?: string }) => {
                    if (response.resultCode === 1) {
                        return (userCountSuccess(response.data));
                    } else {
                        return (userCountFail(response.message));
                    }
                });
        }
        );
};
const epics = [pageName, userCount];

export default epics;