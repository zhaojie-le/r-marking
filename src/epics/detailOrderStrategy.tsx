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

const onSaveRuleSuccess = (result) => {
    return {
        type: `${constants.ONSAVERULE_SUCCESS}`,
        result: result
    };
};

const onSaveRuleFail = (error) => {
    return {
        type: `${constants.ONSAVERULE_FAIL}`,
        error: error
    };
};

const strategyList: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.DETAILORDER_STRATEGY)
        .switchMap(
            (action): Observable<any> => {
                // 229633399113924614 ${action.id}
                return ajax.getJSON(`/marketStrategy/edit/${action.id}`)
                    .map((response: { resultCode: number, data: object }) => {
                        if (response.resultCode === 1) {
                            return (detailOrderSuccess(response.data));
                        } else {
                            return (detailOrderFail(response));
                        }
                    });
            }
        );
};

const onSaveRule: Epic<any, any, any> = (action$, store) => {
    return action$.ofType(constants.ONSAVERULE)
        .switchMap(
            (action): Observable<any> => {
                return ajax.post('/marketStrategy/update', action.params)
                    .map(response => {
                        if (response.response.resultCode === 1) {
                            window.location.href = 'http://usermarket.daojia-inc.com/';
                            return (onSaveRuleSuccess(response.response.data));
                        } else {
                            return (onSaveRuleFail(response.response));
                        }
                    });
            }
        );
};
const detailEpic = [strategyList, onSaveRule];

export default detailEpic;