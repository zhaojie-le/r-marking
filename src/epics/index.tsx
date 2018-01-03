import { combineEpics } from 'redux-observable';
import cosEpic from './createOrderStrategy';
import listEpic from './list';
import detailEpic from './detailOrderStrategy';
import ruleEpic from './strategyRules';
import userCondition from './userCondition';

const epicRegistry = [
    ...cosEpic,
    ...listEpic,
    ...detailEpic,
    ...ruleEpic,
    ...userCondition
];

export const rootEpic = combineEpics(...epicRegistry);