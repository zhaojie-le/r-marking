import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs';
import { Epic } from 'redux-observable';
// const address = "";
const detailOrderSuccess = (result) => {
    return {
        type: `${constants.DETAILORDER_STRATEGY_SUCCESS}`,
        result: result
    };
};

const detailOrderFail = (error) => {
    return {
        type: `${constants.DETAILORDER_STRATEGY_FAIL}`,
        error: error
    };
};

const strategyList: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.DETAILORDER_STRATEGY).
        switchMap(
        (action): Observable<any> => {
            return ajax.getJSON(`/marketDetailStrategy/getRule`).
                map((response: {resultCode: number, data: object}) => {
                console.log('responseresponseresponse=' + JSON.stringify(response));
                if (response.resultCode === 1) {
                return (detailOrderSuccess(response.data));
                } else {
                return (detailOrderFail(response));
                }
            });
        }
    );
};
const detailEpic = [strategyList];

export default detailEpic;