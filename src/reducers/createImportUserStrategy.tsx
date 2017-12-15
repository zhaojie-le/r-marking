import { CreateImportUserStrategy } from '../types/createImportUserStrategy';
import {
    STRATEGY_RULE_SUCCESS,
    STRATEGY_RULE_FAIL,
    RES_PERSON_RULE_SUCCESS,
    RES_PERSON_RULE_FAIL,
} from '../constants';

function enthusiasm(
    state: CreateImportUserStrategy = {
        strategyRule: '请输入用户批次',
        resPersonRule: '',
    },
    action: any
) {
    switch (action.type) {
        case STRATEGY_RULE_SUCCESS:
            return { ...state, strategyRule: action.result };
        case STRATEGY_RULE_FAIL:
            return { ...state, strategyRule: action.result };
        case RES_PERSON_RULE_SUCCESS:
            return { ...state, resPersonRule: action.result };
        case RES_PERSON_RULE_FAIL:
            return { ...state, resPersonRule: action.result };
        default:
            return { ...state };
    }
}
export const createImportUserStrategyReducer = {
    createImportUserStrategy: enthusiasm
};