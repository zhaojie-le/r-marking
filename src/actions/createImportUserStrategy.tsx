import * as constants from '../constants';

export interface StrategyRule {
    type: constants.STRATEGYRULE;
    id: number;
}

export interface ResPersonRule {
    type: constants.RESPERSONRULE;
    id: number;
}

// export interface OnSaveRule {
//     type: constants.ONSAVERULE;
//     params: any;
// }
// | OnSaveRule
export type CreateImportUserStrategy = StrategyRule | ResPersonRule;

export function strategyRule(id: number): StrategyRule {
    return {
        type: constants.STRATEGYRULE,
        id: id,
    };
}

export function resPersonRule(id: number): ResPersonRule {
    return {
        type: constants.RESPERSONRULE,
        id: id,
    };
}

// export function OnSaveRule(params: any): OnSaveRule {
//     return {
//         type: constants.ONSAVERULE,
//         params: params,
//     };
// }