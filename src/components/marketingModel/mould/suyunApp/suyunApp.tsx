import * as React from 'react';
import './style.scss';
import {
    Input,
    Row,
    Col,
    Radio,
} from 'antd';
import withOperator from '../mouldOperate';

const RadioGroup = Radio.Group;
interface SuyunProp {
    value?: any;
    stage?: number;
    onChange: (value: any) => any;
}

interface SunyunState {
    docs: string;
    link: string;
    title: string;
    type: string;
}

class SuyunAppModel extends React.Component<SuyunProp, SunyunState> {
    constructor(props: any, context: any) {
        super(props, context);

        const value = this.props.value || {};
        this.state = {
            docs: value.docs || '',
            link: value.link || '',
            title: value.title || '',
            type: value.type || 3,
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

    ttChange = (event) => {
        const title = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ title });
        }
        this.triggerChange({ title });
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
        const { docs, title, link }: any = this.state;
        const { stage } = this.props;

        return (
            <div className="suyunAppModel">
                <Row>
                    <Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 标题:</Col>
                    <Col span={19}><Input placeholder="请输入标题!" onChange={this.ttChange} defaultValue={title}/></Col>
                </Row>
                <Row>
                    <Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 文案:</Col>
                    <Col span={19}><Input placeholder="请输入文案!" onChange={this.wnChange} defaultValue={docs}/></Col>
                </Row>
                <Row>
                    <Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 跳转链接:</Col>
                    <Col span={19}>
                        <RadioGroup onChange={this.linkChange} value={this.state.link} defaultValue={link} disabled={!!stage}>
                            <Radio value={1}>58速运App首页</Radio>
                            <Radio value={2}>58速运App券列表页</Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({title: '58速运App push'})(SuyunAppModel);
export default OUTPUT;