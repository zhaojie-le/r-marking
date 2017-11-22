import { createStore, applyMiddleware } from 'redux';
import { StoreState } from './types/index';
import reducer from './reducers/index';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic } from './epics';

const epicMiddleware1: EpicMiddleware<any, any> = createEpicMiddleware(rootEpic);

const initialState = {};

const store = createStore<StoreState>(
    reducer as any, 
    initialState as any, 
    composeWithDevTools(applyMiddleware(epicMiddleware1))
);

export default store;