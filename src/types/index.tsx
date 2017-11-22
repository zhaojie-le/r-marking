import { ListState } from './list';
import { CreateOrderStrategy } from './createOrderStrategy';

export interface StoreState {
    list: ListState;
    createOrderStrategy: CreateOrderStrategy;
}
