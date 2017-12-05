import { DetailOrderStrategy } from '../types/detailOrderStrategy';
import { DETAILORDER_STRATEGY_SUCCESS } from '../constants';

function enthusiasm(
        state: DetailOrderStrategy = {
            formState: {},
            actionParam: {}
        },
        action: any 
    ) {
        switch (action.type) {
            case DETAILORDER_STRATEGY_SUCCESS:
                console.log({...state});
                return { ...state, formState: action.result, actionParam: action.result.actionParam};
            default:
                return { ...state };
        }  
 }
export const detailOrderStrategyReducer = {
    detailOrderStrategy: enthusiasm
};