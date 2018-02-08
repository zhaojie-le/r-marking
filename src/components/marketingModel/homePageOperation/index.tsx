import * as React from 'react';
import { default as switchEditState } from '../switchEditState';
import {
    Input,
    Row,
    Col,
} from 'antd';

interface Prop {
    value?: any;
    onChange: (value: any) => any;
}

function getBt(str: string): number {
    var char = str.replace(/[^\x00-\xff]/g, '**');
    return char.length;
}

function validate(fields: any[]): string {
    return fields.reduce(
        (last, item) => {
            switch (item.type) {
                case 'require':
                    return !item.value ? `${last}, ${item.errMsg}` : `${last}`;
                case 'limit':
                    return !!item.value && getBt(item.value) > item.limitNumber ? `${last}, ${item.errMsg}` : `${last}`;
                default:
                    return `${last}`;
            }
        },
        ''
    ).substring(1);
}

export class HomePageOperation extends React.Component<Prop, {}> {
    constructor(props: Prop, context: any) {
        super(props, context);
        this.state = Object.assign({ link: '', imgUrl: '' }, this.props.value);
    }

    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ ...value });
        }
    }

    tbChange = (event) => {
        const imgUrl = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ imgUrl });
        }
        this.triggerChange({ imgUrl });
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
            onChange(Object.assign({ keys: ['9'] }, this.state, changedValue));
        }
    }

    render() {
        const { imgUrl, link }: any = this.state;

        return (
            <div className="loadElement">
                <Row>
                    <Col span={3}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 图标:</Col>
                    <Col span={19}><Input placeholder="请输入图片地址!" onChange={this.tbChange} defaultValue={imgUrl} /></Col>
                </Row>
                <Row>
                    <Col span={3}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 跳转链接:</Col>
                    <Col span={19}><Input placeholder="请输入跳转链接!" onChange={this.linkChange} defaultValue={link} /></Col>
                </Row>
            </div>
        );
    }
}

export default switchEditState(
    (rule, value, callback) => {
        if (value.imgUrl && value.link) {
            callback();
            return;
        }
        callback(
            validate([
                { type: 'require', value: value.imgUrl, errMsg: '图片地址不能为空' },
                { type: 'require', value: value.link, errMsg: '链接不能为空' }
            ])
        );
    },
    (props) => {
        const { values } = props;
        return (
            <div>
                <p><span style={{ color: 'red' }}>消息推送</span> 优先级：渠道1>渠道2>渠道3 优先渠道送达后，其他渠道将不再推送</p>
                <Row>
                    <Col span={3} style={{ color: '#462bc3' }}>图片地址:</Col>
                    <Col span={16}><p title={values.imgUrl}>{values.imgUrl}</p></Col>
                </Row>
                <Row>
                    <Col span={3} style={{ color: '#462bc3' }}>跳转链接:</Col>
                    <Col span={16}><p title={values.link as any}>{values.link}</p></Col>
                </Row>
            </div>
        );
    },
    '首页运营位',
    { yxfs: { imgUrl: '', link: '' } }
)(HomePageOperation);
