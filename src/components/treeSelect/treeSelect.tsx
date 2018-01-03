import * as React from 'react';
import './style.scss';
export interface RuleProps {
    form: any;
}

class TreeSelect extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="wrapperRules">
                <div className="triggerRules">
                AA
                </div>
            </div>
        );
    }
}

export default TreeSelect;
