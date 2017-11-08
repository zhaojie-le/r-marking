import { combineEpics } from 'redux-observable';
// import { Observable } from 'rxjs/Rx';
import helloEpic from './hello';

export const rootEpic = combineEpics(...helloEpic);