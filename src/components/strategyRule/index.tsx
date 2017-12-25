import * as React from 'react';
import { StrategyRule } from './order';
import { PendantRule } from './pendant';
import { ErrorBoundary } from '../errorBoundary';
import { OrderPayRule } from './orderPay';
import { ValueRule } from './storedValue';

interface Props {
    form: any;
    strategyType: number;
    onChange: (value: any) => void;
}
class RuleCreater extends React.Component<Props, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    render() {
        const { strategyType, ...props } = this.props;
        let ruleType: any;

        switch ( strategyType ) {
            case 1:
                ruleType = <StrategyRule {...props} />;
                break;
            case 3:
                ruleType = <OrderPayRule {...props} />;
                break;
            case 6:
                ruleType = <ValueRule {...props} />;
                break;
            case 7:
                ruleType = <PendantRule {...props} />;
                break;
            default:
                ruleType = <div>请从新选择</div>;
                break;
        }
        return (
            <ErrorBoundary>
                {
                    ruleType
                }
            </ErrorBoundary>
        );
    }
}

export default RuleCreater;
