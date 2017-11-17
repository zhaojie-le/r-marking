import { combineReducers } from 'redux';

import { ListReducer } from './list';
import { createOrderStrategyReducer } from './createOrderStrategy';

const reducers = {
    ...ListReducer,
    ...createOrderStrategyReducer
};

export default combineReducers(reducers);