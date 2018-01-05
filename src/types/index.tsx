import { ListState } from './list';
import { CreateOrderStrategy } from './createOrderStrategy';
import { DetailOrderStrategy } from './detailOrderStrategy';
import { StrategyRules } from './strategyRules';
import { UserCondition } from './userCondition';

export interface StoreState {
    list: ListState;
    strategyRules: StrategyRules;
    createOrderStrategy: CreateOrderStrategy;
    detailOrderStrategy: DetailOrderStrategy;
    userCondition: UserCondition;
}
