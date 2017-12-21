import { combineReducers } from 'redux';
import { createOrderStrategyReducer } from './createOrderStrategy';
import { ListReducer } from './list';
import { detailOrderStrategyReducer } from './detailOrderStrategy';
import { strategyRules } from './strategyRules';

const reducers = {
    ...createOrderStrategyReducer,
    ...ListReducer,
    ...detailOrderStrategyReducer,
    ...strategyRules
};

export default combineReducers(reducers);