import { ajax } from 'rxjs/observable/dom/ajax';
import * as constants from '../constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs';
import { Epic } from 'redux-observable';

const pageNameSuccess = (result) => {
  return {
      type: constants.PAGE_NAME_SUC,
      result: result
  };
};

const pageNameFail = (error) => {
  return {
      type: constants.PAGE_NAME_FAIL,
      error: error
  };
};

const pageName: Epic<any, any> = (action$, store) => {
  return action$.ofType(constants.PAGE_NAME).
      switchMap(
          (action): Observable<any> => {
              return ajax.getJSON(`/marketStrategy/getPageInfo?pageId=${action.pageId}`).
                  map((response: {resultCode: number, data: any[]}) => {
                      if (response.resultCode === 1) {
                          return (pageNameSuccess(response.data));
                      } else {
                          return (pageNameFail(response));
                      }
                  });
          }
      );
};

const epics = [pageName];

export default epics;