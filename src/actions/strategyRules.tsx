import * as constants from '../constants';

export interface PageName {
  type: constants.PAGE_NAME;
  id: any;
}

export function pageName(id: string): PageName {
  return {
      type: constants.PAGE_NAME,
      id: id,
  };
}