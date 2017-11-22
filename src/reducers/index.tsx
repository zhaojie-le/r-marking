import { combineReducers } from 'redux';
import { createOrderStrategyReducer } from './createOrderStrategy';

const reducers = {
    ...createOrderStrategyReducer
};

export default combineReducers(reducers);