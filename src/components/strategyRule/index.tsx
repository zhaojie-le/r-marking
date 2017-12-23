import * as React from 'react';
import { StrategyRule } from './order';
import { PendantRule } from './pendant';
import { ErrorBoundary } from '../errorBoundary';
import { OrderPayRule } from './orderPay';

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
        const { strategyType } = this.props;
        let ruleType: any;

        switch ( strategyType ) {
            case 1:
                ruleType = <StrategyRule form={this.props.form} onChange={this.props.onChange} />;
                break;
            case 3:
                ruleType = <OrderPayRule form={this.props.form} onChange={this.props.onChange} />;
                break;
            case 7:
                ruleType = <PendantRule form={this.props.form} onChange={this.props.onChange} />;
                break;
            default:
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
