import * as constants from '../constants/createOrderStrategy';

export interface ChangeField {
    type: constants.CHANGE_FIELD;
    payload: any;
}

export interface Filed {
    value: any;
    name: string;
    [propName: string]: any;
}
export type ChangeFieldType = ChangeField;

export function changeField(fields: Filed): ChangeField {
    return {
        type: constants.CHANGE_FIELD,
        payload: fields,
    };
}