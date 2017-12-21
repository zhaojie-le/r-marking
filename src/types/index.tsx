import { ListState } from './list';
import { CreateOrderStrategy } from './createOrderStrategy';
import { DetailOrderStrategy } from './detailOrderStrategy';
import { StrategyRules } from './strategyRules';

export interface StoreState {
    list: ListState;
    strategyRules: StrategyRules;
    createOrderStrategy: CreateOrderStrategy;
    detailOrderStrategy: DetailOrderStrategy;
}
