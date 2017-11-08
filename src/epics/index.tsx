import { combineEpics } from 'redux-observable';
// import { Observable } from 'rxjs/Rx';
import helloEpic from './list';

export const rootEpic = combineEpics(...helloEpic);