import { combineEpics } from 'redux-observable';
import cosEpic from './createOrderStrategy';
import listEpic from './list';
import detailEpic from './detailOrderStrategy';
import ruleEpic from './strategyRules';

const epicRegistry = [
    ...cosEpic,
    ...listEpic,
    ...detailEpic,
    ...ruleEpic,
];

export const rootEpic = combineEpics(...epicRegistry);