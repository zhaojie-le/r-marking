import { combineReducers } from 'redux';
import { createOrderStrategyReducer } from './createOrderStrategy';
import { ListReducer } from './list';
import { detailOrderStrategyReducer } from './detailOrderStrategy';
import { strategyRules } from './strategyRules';
import { userCondition } from './userCondition';

const reducers = {
    ...createOrderStrategyReducer,
    ...ListReducer,
    ...detailOrderStrategyReducer,
    ...strategyRules,
    ...userCondition
};

export default combineReducers(reducers);