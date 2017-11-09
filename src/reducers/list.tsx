import * as actions from '../actions/list';
import { ListState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

interface RList { list: (state: ListState, action: actions.EnthusiasmAction) => ListState; }

function enthusiasm(state: ListState = { enthusiasmLevel: 1, languageName: 'marketing'}, action: actions.EnthusiasmAction): ListState {
    switch (action.type) {
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