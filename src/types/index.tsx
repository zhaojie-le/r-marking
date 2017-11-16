import { ListState, ListGetSuccess } from './list';

export interface StoreState {
    list: ListState;
}

export type ListResponseType = ListGetSuccess