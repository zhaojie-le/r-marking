import * as React from 'react';
import './style.scss';
import {
    Input,
    Checkbox,
    Row,
    Col,
    DatePicker
} from 'antd';
import withOperator from '../mouldOperate';
// import * as moment from 'moment';

interface DaojiaProp {
    value?: any;
    stage?: number;
    showOrderDetailCheck?: boolean;
    onChange: (value: any) => any;
}

class DaojiaAppModel extends React.Component<DaojiaProp, {}> {
    state = {
        linkInput: false,
        docs: '',
        link: '',
        title: '',
        type: '2',
        piclink: '',
        activityendtime: '',
        showOrderDetailCheck: false,
        hasPreActChecked: true,
    };
    private detailLink: string = 'xxx';

    constructor(props: any, context: any) {
        super(props, context);
        const value = this.props.value || {};
        this.state = { ...this.state, ...value, type: 2, showOrderDetailCheck: this.props.showOrderDetailCheck };
        console.log('DDDDDDDDDD' + JSON.stringify(this.state));
    }

    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ ...value, showOrderDetailCheck: nextProps.showOrderDetailCheck });
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

    activityEndTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        const activityendtime = dateString;
        if (!('value' in this.props)) {
            this.setState({ activityendtime });
        }
        this.triggerChange({ activityendtime });
    }

    plChange = (event) => {
        const piclink = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ piclink });
        }
        this.triggerChange({ piclink });
    }

    onOk = (value) => {
        console.log('onOk: ', value);
    }

    linkChange = (event) => {
        const isLinkInputDs = event.target.checked;
        const link = event.target.checked ? this.detailLink : event.target.value;
        if (!('value' in this.props)) {
            this.setState({
                link: link,
                linkInput: isLinkInputDs,
            });
        }
        this.triggerChange({ link, linkInput: isLinkInputDs });
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    preActChange = (event) => {
        event.target.checked === true ?
            this.setState({
                hasPreActChecked: true,
            }) :
            this.setState({
                hasPreActChecked: false,
            });
    }
    isHourEmploee = () => {
        let { linkInput, link } = this.state;
        const { stage } = this.props;
        console.log('link');
        const hasChecked = link === this.detailLink ? true : false;
        linkInput = stage ? true : linkInput;

        return (
            <div>
                {this.state.showOrderDetailCheck ? <Checkbox onChange={this.linkChange} disabled={!!stage} checked={hasChecked}>该订单详情页</Checkbox> : null}
                <Input placeholder="请输入跳转链接!" onChange={this.linkChange} disabled={linkInput} defaultValue={hasChecked ? '' : link} />
            </div>
        );
    }

    render() {
        const { docs, title, piclink, activityendtime, hasPreActChecked }: any = this.state;
        console.log('hasPreActChecked===' + hasPreActChecked);
        console.log('hasPreActChecked===' + activityendtime);
        return (
            <div className="daojiaAppModel">
                <Row>
                    <Col span={5}> 消息类型:</Col><Col span={19}> <Checkbox onChange={this.preActChange} checked={hasPreActChecked}>优惠活动</Checkbox></Col>
                </Row>
                <div style={(hasPreActChecked === true) ? { display: 'block' } : { display: 'none' }}>
                    <Row>
                        <Col span={5}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 图片链接:</Col>
                        <Col span={19}><Input placeholder="请输入图片链接!" onChange={this.plChange} defaultValue={piclink} /></Col>
                    </Row>
                    <Row>
                        <Col span={5}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 活动结束时间:</Col>
                        <Col span={19}>
                            <DatePicker
                                showTime={true}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="请输入结束时间"
                                // defaultValue={moment('2018-01-30 14:58:06')}
                                onChange={this.activityEndTime}
                                onOk={this.onOk}
                            />
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span={5}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 标题:</Col><Col span={19}><Input placeholder="请输入标题!" onChange={this.ttChange} defaultValue={title} /></Col>
                </Row>
                <Row>
                    <Col span={5}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 文案:</Col><Col span={19}><Input placeholder="请输入文案!" onChange={this.wnChange} defaultValue={docs} /></Col>
                </Row>
                <Row>
                    <Col span={5}><i style={{ color: 'red', fontStyle: 'normal' }}>*</i> 跳转链接:</Col><Col span={19}>{this.isHourEmploee()}</Col>
                </Row>
                <Row>
                    <Col span={19} offset={5} style={{ lineHeight: '16px', color: '#2a52be' }}>系统自动加入hmsr参数，无需手动填写hmsr=daojia_clyx_策略id_策略类别_活动id（活动id只有发券类型才有）</Col>
                </Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({ title: '58到家App push' })(DaojiaAppModel);
export default OUTPUT;
