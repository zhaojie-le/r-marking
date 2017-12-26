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
            docs: value.docs || '',
            link: value.link || '',
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
                <Row>
                    <Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 文案:</Col>
                    <Col span={19}><Input placeholder="请输入文案!" onChange={this.wnChange} defaultValue={docs}/></Col>
                </Row>
                <Row>
                    <Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 跳转链接:</Col>
                    <Col span={19}><Input placeholder="请输入跳转链接!" onChange={this.linkChange} defaultValue={link} disabled={!!stage}/></Col>
                </Row>
                <Row><Col span={19} offset={5} style={{lineHeight: '16px', color: '#2a52be'}}>系统自动加入hmsr参数，无需手动填写hmsr=duanxin_clyx_策略id_策略类别_活动id(活动id只有发券类型才有）</Col></Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({title: '短信'})(Sms);
export default OUTPUT;