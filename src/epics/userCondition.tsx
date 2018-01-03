import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs';
import { Epic } from 'redux-observable';

const tagNodeTreeSuccess = (list) => {
    return {
        type: constants.TAG_NODE_TREE_SUC,
        list: list
   };
};

const tagNodeTreeFail = (error) => {
    return {
        type: constants.TAG_NODE_TREE_FAIL,
        error: error
    };
};

const getUserAmountSuccess = (num) => {
    return {
        type: constants.USER_AMOUNT_SUC,
        num: num
   };
};

const getUserAmountFail = (error) => {
    return {
        type: constants.USER_AMOUNT_FAIL,
        error: error
    };
};

const tagNodeTree: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.TAG_NODE_TREE).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`/marketStrategy/getTagNodeTree?id=${action.id}`).
                    map((response: {resultCode: number, list: any}) => {
                        if (response.resultCode === 1) {
                            return (tagNodeTreeSuccess(response.list));
                        } else {
                            return (tagNodeTreeFail(response));
                        }
                    });
            }
    );
};

const getUserAmount: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.USER_COUNT).
        switchMap(
            (action): Observable<any> => {
                return ajax.getJSON(`/marketStrategy/getUserAmount?tagSet=${action.tag}`).
                    map((response: {resultCode: number, count?: number}) => {
                        if (response.resultCode === 1) {
                            return (getUserAmountSuccess(response.count));
                        } else {
                            return (getUserAmountFail(response));
                        }
                    });
            }
    );
};
const epics = [tagNodeTree, getUserAmount];

export default epics;