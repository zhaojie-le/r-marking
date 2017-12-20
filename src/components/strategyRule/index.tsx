import * as React from 'react';
import { StrategyRule } from './order';

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
            default:
                break;
        }
        return (
            <div>
                {
                    ruleType
                }
            </div>
        );
    }
}

export default RuleCreater;
