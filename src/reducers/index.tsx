import { combineReducers } from 'redux';

import { ListReducer } from './list';

const reducers = {
    ...ListReducer
};

export default combineReducers(reducers);