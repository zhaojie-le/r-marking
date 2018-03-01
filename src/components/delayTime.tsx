import * as React from 'react';
import {
    InputNumber,
} from 'antd';

export interface DelayTimeProps {
    value?: any;
    onChange?: (value: any) => void;
}

export default class DelayTime extends React.Component<DelayTimeProps, { day?: any, minute?: any }> {
    constructor(props: any) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            day: value.day || '',
            minute: value.minute || '',
        };
    }

    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    handleDayChange = (day) => {
        if (!('value' in this.props)) {
            this.setState({ day });
        }
        this.triggerChange({ day });
    }

    handleMinutChange = (minute) => {
        if (!('value' in this.props)) {
            this.setState({ minute });
        }
        this.triggerChange({ minute });
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const { day, minute } = this.state;

        return (
            <div>
                <InputNumber
                    min={0}
                    max={100}
                    style={{ width: '100px' }}
                    onChange={this.handleDayChange}
                    defaultValue={day}
                />
                <span>天</span>
                <InputNumber
                    min={0}
                    max={100}
                    style={{ width: '100px', marginLeft: '15px' }}
                    onChange={this.handleMinutChange}
                    defaultValue={minute}
                />
                <span>分钟</span>
                <span style={{ color: 'red', marginLeft: '15px' }}>注：订单状态变更后的X天Y分钟</span>
            </div>
        );
    }
}
