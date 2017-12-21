import * as React from 'react';

interface ShowRuleProps {
    rules: any[];
}

export default function ShowRule(props: ShowRuleProps) {
    const { rules } = props;

    return (
        <section className="showInfo">
            {
                rules.map((item, i) => {
                    return <p key={i}><label>{item.label}:</label><span>{item.value}</span></p>;
                })
            }
        </section>
    );
}
