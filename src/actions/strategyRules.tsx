import * as constants from '../constants';

export interface PageName {
    type: constants.PAGE_NAME;
    pageId: any;
}
export interface UserCount {
    type: constants.USER_COUNT;
    patchId: any;
}
export function pageName(id: string): PageName {
    return {
        type: constants.PAGE_NAME,
        pageId: id,
    };
}
export function userCount(id: string): UserCount {
    return {
        type: constants.USER_COUNT,
        patchId: id,
   };
}
export type RulesAction = PageName | UserCount;