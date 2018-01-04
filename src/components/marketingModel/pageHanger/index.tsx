import * as React from 'react';
import { default as switchEditState }  from '../switchEditState';
import {
    Input,
    Row,
    Col,
    Select,
} from 'antd';

const Option = Select.Option;

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

class PageHanger extends React.Component<Prop, {}> {
    constructor(props: Prop, context: any) {
        super(props, context);
        this.state = Object.assign({link: '', docs: '', imgUrl: ''}, this.props.value);
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

    asChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ animation: value });
        }
        this.triggerChange({ animation: value });
    }

    positionChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ position: value });
        }
        this.triggerChange({ position: value });
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
        const { animation, imgUrl, link, position }: any = this.state;

        return (
            <div className="loadElement">
                <Row>
                    <Col span={3}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 图标:</Col>
                    <Col span={19}><Input placeholder="请输入图片地址!" onChange={this.tbChange} defaultValue={imgUrl}/></Col>
                </Row>
                <Row>
                    <Col span={3}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 跳转链接:</Col>
                    <Col span={19}><Input placeholder="请输入跳转链接!" onChange={this.linkChange} defaultValue={link}/></Col>
                </Row>
                <Row>
                    <Col span={3}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 动画:</Col>
                    <Col span={19}>
                        <Select defaultValue={animation} style={{ width: 120 }} onChange={this.asChange}>
                            <Option value="1">左右摆动</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 位置:</Col>
                    <Col span={19}>
                        <Select defaultValue={position} style={{ width: 120 }} onChange={this.positionChange}>
                            <Option value="1">页面右下角</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={19} offset={3} style={{lineHeight: '16px', color: '#2a52be'}}>系统自动加入hmsr参数，无需手动填写hmsr=daojia_clyx_策略id_策略类别_活动id（活动id只有发券类型才有）</Col>
                </Row>
            </div>
        );
    }
}

export default switchEditState(
    (rule, value, callback) => {
        if (value.imgUrl && value.link && value.position && value.animation) {
            callback();
            return;
        }
        callback(
            validate([
                {type: 'require', value: value.imgUrl, errMsg: '图片地址不能为空'},
                {type: 'require', value: value.animation, errMsg: '动画不能为空'},
                {type: 'require', value: value.position, errMsg: '位置不能为空'},
                {type: 'require', value: value.link, errMsg: '链接不能为空'}
            ])
        );
    },
    (props) => {
        const { values } = props;
        const animationMap = {
            '1': '左右摆动',
        };
        const positionMap = {
            '1': '页面右下角',
        };

        return (
            <div>
                <p><span style={{color: 'red'}}>消息推送</span> 优先级：渠道1>渠道2>渠道3 优先渠道送达后，其他渠道将不再推送</p>
                <Row>
                    <Col span={3} style={{ color: '#462bc3'}}>图片地址:</Col>
                    <Col span={16}><p title={values.imgUrl}>{values.imgUrl}</p></Col>
                </Row>
                <Row>
                    <Col span={3} style={{ color: '#462bc3'}}>跳转链接:</Col>
                    <Col span={16}><p title={values.link as any}>{values.link}</p></Col>
                </Row>
                <Row>
                    <Col span={3} style={{ color: '#462bc3'}}>动画:</Col>
                    <Col span={16}><p title={animationMap[values.animation]}>{animationMap[values.animation]}</p></Col>
                </Row>
                <Row>
                    <Col span={3} style={{ color: '#462bc3'}}>位置:</Col>
                    <Col span={16}><p title={positionMap[values.position]}>{positionMap[values.position]}</p></Col>
                </Row>
            </div>
        );
    },
    '页面挂件',
    {yxfs: { imgUrl: '', link: '', animation: '1', position: '1' }}
)(PageHanger);
