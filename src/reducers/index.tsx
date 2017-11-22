import { combineReducers } from 'redux';
import { createOrderStrategyReducer } from './createOrderStrategy';
import { ListReducer } from './list';

const reducers = {
    ...createOrderStrategyReducer,
    ...ListReducer
};

export default combineReducers(reducers);