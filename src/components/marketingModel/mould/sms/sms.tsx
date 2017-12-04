import * as React from 'react';
import './style.scss';
import {
    Input,
    Row,
    Col,
} from 'antd';
import withOperator from '../mouldOperate';

interface SmsNumberProp {
    value?: any;
    stage?: number;
    onChange: (value: any) => any;
}

class Sms extends React.Component<SmsNumberProp, {}> {
    constructor(props: any, context: any) {
        super(props, context);

        const value = this.props.value || {};
        this.state = {
            docs: value.docs || 0,
            link: value.link || 0,
            type: value.type,
        };
    }
    
    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    wnChange = (event) => {
        const docs = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ docs });
        }
        this.triggerChange({ docs });
    }

    linkChange = (event) => {
        const link = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ link });
        }
        this.triggerChange({ link });
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
              onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const { docs, link }: any = this.state;
        const { stage } = this.props;

        return (
            <div className="sms">
                <Row><Col span={4}>* 文案:</Col><Col span={20}><Input placeholder="请输入文案!" onChange={this.wnChange} defaultValue={docs}/></Col></Row>
                <Row><Col span={4}>* 跳转链接:</Col><Col span={20}><Input placeholder="请输入跳转链接!" onChange={this.linkChange} defaultValue={link} disabled={!!stage}/></Col></Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({title: '短信'})(Sms);
export default OUTPUT;