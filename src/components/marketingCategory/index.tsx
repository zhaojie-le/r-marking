import * as React from 'react';
import { ErrorBoundary } from '../errorBoundary';
import { SelectCategory } from './selectCategory';
import { InputCategory } from './inputCategory';
interface Props {
    form: any;
    strategyType: number;
    onChange: (value: any) => void;
}
class CategoryCreater extends React.Component<Props, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    render() {
        const { strategyType, ...props } = this.props;
        let category: any;
        if (strategyType === 6) {
            category = <InputCategory {...props}/>;
        } else {
            category = <SelectCategory strategyType={this.props.strategyType} form={this.props.form} onChange={this.props.onChange}/>;
        }

        return (
            <ErrorBoundary>
                {
                    category
                }
            </ErrorBoundary>
        );
    }
}
export default CategoryCreater;