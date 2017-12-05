import { DetailOrderStrategy } from '../types/detailOrderStrategy';
import { DETAILORDER_STRATEGY_SUCCESS } from '../constants';

function enthusiasm(
        state: DetailOrderStrategy = {
            formState: {},
        },
        action: any 
    ):
    DetailOrderStrategy {
        switch (action.type) {
        case DETAILORDER_STRATEGY_SUCCESS:
            return {
                ...state,
                formState: action.result,
            };
        default:
            return { ...state };
        }  
 }
export const detailOrderStrategyReducer = {
    detailOrderStrategy: enthusiasm
};