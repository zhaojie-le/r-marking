import { ListState } from './list';
import { CreateOrderStrategy } from './createOrderStrategy';
import { DetailOrderStrategy } from './detailOrderStrategy';
import { CreateImportUserStrategy } from './createImportUserStrategy';

export interface StoreState {
    list: ListState;
    createOrderStrategy: CreateOrderStrategy;
    detailOrderStrategy: DetailOrderStrategy;
    createImportUserStrategy: CreateImportUserStrategy;
}
