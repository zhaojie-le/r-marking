import { ListState } from './list';
import { CreateOrderStrategy } from './createOrderStrategy';
import { DetailOrderStrategy } from './detailOrderStrategy';

export interface StoreState {
    list: ListState;
    createOrderStrategy: CreateOrderStrategy;
    detailOrderStrategy: DetailOrderStrategy;
}
