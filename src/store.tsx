import { createStore, applyMiddleware } from 'redux';
import { StoreState } from './types/index';
import { enthusiasm } from './reducers/index';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic } from './epics';

const epicMiddleware1: EpicMiddleware<any, any> = createEpicMiddleware(rootEpic);

const store = createStore<StoreState>(
    enthusiasm, 
    {
        enthusiasmLevel: 1,
        languageName: 'TypeScript',
    }, 
    composeWithDevTools(applyMiddleware(epicMiddleware1))
);

export default store;