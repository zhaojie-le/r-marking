import { combineEpics } from 'redux-observable';
import cosEpic from './createOrderStrategy';

const epicRegistry = [
    ...cosEpic
];

export const rootEpic = combineEpics(...epicRegistry);