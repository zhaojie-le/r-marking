import { combineReducers } from 'redux';
import { createOrderStrategyReducer } from './createOrderStrategy';
import { ListReducer } from './list';
import { detailOrderStrategyReducer } from './detailOrderStrategy';
import { createImportUserStrategyReducer } from './createImportUserStrategy';

const reducers = {
    ...createOrderStrategyReducer,
    ...ListReducer,
    ...detailOrderStrategyReducer,
    ...createImportUserStrategyReducer
};

export default combineReducers(reducers);