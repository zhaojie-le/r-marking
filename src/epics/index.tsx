import { combineEpics } from 'redux-observable';
// import { Observable } from 'rxjs/Rx';
import helloEpic from './list';
import cosEpic from './createOrderStrategy';

const epicRegistry = [
    ...helloEpic, 
    ...cosEpic
];

export const rootEpic = combineEpics(...epicRegistry);