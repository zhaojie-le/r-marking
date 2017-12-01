import { combineEpics } from 'redux-observable';
import cosEpic from './createOrderStrategy';
import listEpic from './list';
import detailEpic from './detailOrderStrategy';

const epicRegistry = [
    ...cosEpic,
    ...listEpic,
    ...detailEpic
];

export const rootEpic = combineEpics(...epicRegistry);