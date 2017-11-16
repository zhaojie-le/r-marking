
import * as constants from '../constants';
import { ListResponseType } from '../types';

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
    response: ListResponseType;
}

export interface ChangeParams {
    type: constants.CHANGE_PARAMS;
    params?: object;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | StrategyList | StrategyListSuccess | ChangeParams ;

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

export function StrategyList(): StrategyList {
    return {
        type: constants.STRATEGY_LIST
    };
}

export function StrategyListSuccess(response: ListResponseType): StrategyListSuccess {
    return {
        type: constants.STRATEGY_LIST_SUC,
        response: response
    };
}

export function ChangeParams(params: object): ChangeParams {
    return {
        type: constants.CHANGE_PARAMS,
        params: params
    };
}
