import { combineEpics } from 'redux-observable';
import cosEpic from './createOrderStrategy';
import listEpic from './list';

const epicRegistry = [
    ...cosEpic,
    ...listEpic
];

export const rootEpic = combineEpics(...epicRegistry);