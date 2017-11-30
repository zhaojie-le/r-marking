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
    return action$.ofType(constants.DETAILORDER_STRATEGY).
        switchMap(
        (action): Observable<any> => {
            return ajax.getJSON(`/marketDetailStrategy/getRule?id=${action.id}`).
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

const onSaveRule: Epic<any, any, any>  = (action$, store) => {
    return action$.ofType(constants.ONSAVERULE).
        switchMap(
            (action): Observable<any>  => {
                console.log(action.params);
                return ajax.post('/marketStrategy/update', action.params).
                map(response => {
                    if (response.response.resultCode === 1) {
                        console.log('修改策略成功');
                        return (onSaveRuleSuccess(response.response.data));
                    } else {
                        console.log('修改策略失败');
                        return (onSaveRuleFail(response.response));
                    }
                });
            }
        );
};
const detailEpic = [strategyList, onSaveRule];

export default detailEpic;