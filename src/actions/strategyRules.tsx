import * as constants from '../constants';

export interface PageName {
  type: constants.PAGE_NAME;
  pageId: any;
}

export function pageName(id: string): PageName {
  return {
      type: constants.PAGE_NAME,
      pageId: id,
  };
}

export type RulesAction =  PageName;