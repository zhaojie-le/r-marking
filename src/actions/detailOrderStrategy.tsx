import * as constants from '../constants';

export interface DetailOrderStrategy {
    type: constants.DETAILORDER_STRATEGY;
    id: number;
}

export interface OnSaveRule {
    type: constants.ONSAVERULE;
    params: any;
}
export type DetailOrderStrategyType = DetailOrderStrategy | OnSaveRule;

export function DetailOrderStrategy(id: number): DetailOrderStrategy {
    return {
      type: constants.DETAILORDER_STRATEGY,
      id: id,
    };
}

export function OnSaveRule(params: any): OnSaveRule {
    return {
      type: constants.ONSAVERULE,
      params: params,
    };
}