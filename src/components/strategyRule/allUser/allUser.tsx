import * as React from 'react';
import '../pendant/style.scss';
export interface RuleProps {
    form: any;
}

class AllUserRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
    };
    render() {
        return (
            <div className="wrapperRules">
                <div className="triggerRules">
                    <div className="ruleContent">
                        <p style={{'marginLeft': 20, 'marginBottom': 10}}>全部用户</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllUserRule;
