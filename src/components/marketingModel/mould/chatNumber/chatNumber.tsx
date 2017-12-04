import * as React from 'react';
import './style.scss';
import {
    Input,
    Row,
    Col,
} from 'antd';
import withOperator from '../mouldOperate';

interface ChatNumberProp {
    onChange: (value: any) => any;
    key: number;
    value: any;
    stage?: number;
}

class ChatNumber extends React.Component<ChatNumberProp, {}> {
    constructor(props: any, context: any) {
        super(props, context);

        const value = this.props.value || {};
        this.state = {
            docs: value.day || 0,
            link: value.minute || 0,
            type: value.type || 4,
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
            <div className="chatNumber">
                <Row><Col span={20} offset={4}><Input placeholder="请输入标题!" onChange={this.wnChange} defaultValue={docs}/></Col></Row>
                <Row><Col span={4}>* 跳转链接:</Col><Col span={20}><Input placeholder="请输入跳转链接!" onChange={this.linkChange} defaultValue={link} disabled={!!stage}/></Col></Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({title: '58到家公众号'})(ChatNumber);
export default OUTPUT;