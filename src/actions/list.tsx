
import * as constants from '../constants';

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM;
    searchkey?: number;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export interface StrategyList {
    type: constants.STRATEGY_LIST;
    response?: object;
}

export interface StrategyListSuccess {
    type: constants.STRATEGY_LIST_SUC;
    response?: object;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | StrategyList | StrategyListSuccess;

export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    };
}

export function StrategyList(params: object): StrategyList {
    return {
        type: constants.STRATEGY_LIST,
        response: params
    };
}

export function StrategyListSuccess(response: object): StrategyListSuccess {
    return {
        type: constants.STRATEGY_LIST_SUC,
        response: response
    };
}
