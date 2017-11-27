import * as constants from '../constants';

export interface DetailOrderStrategy {
 type: constants.DETAILORDER_STRATEGY;
}

export type DetailOrderStrategyType = DetailOrderStrategy;

export function DetailOrderStrategy(): DetailOrderStrategy {
    return {
      type: constants.DETAILORDER_STRATEGY
    };
}