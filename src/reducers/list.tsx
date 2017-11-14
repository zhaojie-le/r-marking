import * as actions from '../actions/list';
import { ListState } from '../types/list';

import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, STRATEGY_LIST, STRATEGY_LIST_SUC } from '../constants/index';

interface RList { list: (state: ListState, action: actions.EnthusiasmAction) => ListState; }

function enthusiasm(state: ListState = { enthusiasmLevel: 1, languageName: 'marketing', listData: [], totalInfo: 0 }, action: actions.EnthusiasmAction): ListState {
    switch (action.type) {
        case STRATEGY_LIST:
            return { ...state};
        case STRATEGY_LIST_SUC:
            return {...state, listData: action.response};
        case INCREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
        case DECREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
        default:
            return { ...state };
    }
}

export const ListReducer: RList = {
    list : enthusiasm
};