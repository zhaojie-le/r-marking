import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs';
import { Epic } from 'redux-observable';
// const address = "";
const strategyRuleSuccess = (result) => {
    return {
        type: `${constants.STRATEGY_RULE_SUCCESS}`,
        result: result
    };
};

const strategyRuleFail = (error) => {
    return {
        type: `${constants.STRATEGY_RULE_FAIL}`,
        error: error
    };
};

const strategyRule: Epic<any, any> = (action$, store) => {
    return action$.ofType(constants.STRATEGYRULE)
        .switchMap(
        (action): Observable<any> => {
            // 229633399113924614 ${action.id}
            console.log(action);
            return ajax.getJSON(`/marketStrategy/getUserCount?userBatchId=${action.id}`)
                .map((response: { resultCode: number, data: number, message: string }) => {
                    if (response.resultCode === 1) {
                        return (strategyRuleSuccess(response.data));
                    } else {
                        return (strategyRuleFail(response.message));
                    }
                });
        }
        );
};

const impuserEpic = [strategyRule];

export default impuserEpic;