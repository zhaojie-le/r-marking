import { combineEpics } from 'redux-observable';
import cosEpic from './createOrderStrategy';
import listEpic from './list';
import detailEpic from './detailOrderStrategy';
import impuserEpic from './createImportUserStrategy';

const epicRegistry = [
    ...cosEpic,
    ...listEpic,
    ...detailEpic,
    ...impuserEpic,
];

export const rootEpic = combineEpics(...epicRegistry);