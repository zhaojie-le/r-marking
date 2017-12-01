import { combineReducers } from 'redux';
import { createOrderStrategyReducer } from './createOrderStrategy';
import { ListReducer } from './list';
import { detailOrderStrategyReducer } from './detailOrderStrategy';

const reducers = {
    ...createOrderStrategyReducer,
    ...ListReducer,
    ...detailOrderStrategyReducer
};

export default combineReducers(reducers);