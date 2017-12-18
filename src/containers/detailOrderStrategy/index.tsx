import * as React from 'react';
import * as actions from '../../actions/';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';
import './index.scss';

import {
    Form,
    Input,
    Row,
    Col,
    Layout,
    Breadcrumb,
    DatePicker,
    InputNumber,
    Radio,
    Button
} from 'antd';
import { MarketingModel } from '../../components';
const FormItem = Form.Item;
const { Content, Footer } = Layout;
const RadioGroup = Radio.Group;

export interface Props {
    param: {};
    actionParam?: any;
    strategyMarketingType?: any;
    match?: any;
    formState?: any;
    form?: any;
    strategyList: (modelData: number) => void;
    onSaveRule: (modelData: object) => void;
    onSaveModel: (modelData: string) => void;
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
};
const formTypeLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutMarketingModel = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
    },
};

class DetailOrderStrategy extends React.Component<Props, object> {
    state = {
        pagetype: window.location.href.indexOf('#edit') > 0 ? false : true,
        startValue: '',
        endValue: '',
        endOpen: false,
        editing: true,
        editDis: true,
        showOrderDetailCheck: false
    };
    constructor(props: Props, context: any) {
        super(props, context);
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onRadioChange = (e) => {
        this.props.formState.marketingTypeInt = e.target.value;
        const isEditing = e.target.value === 1 ? false : true;
        this.setState({
            editing: isEditing,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    // disabledDate = (current) => {
    //     // Can not select days before today and today
    //     return current && current.valueOf() < Date.now();
    // }

    range = (start, end) => {
        let result: number[] = [];
        for (var i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDateTime() {
        return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    onSave = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // 得到的values数据重组
                const { onSaveRule } = this.props;
                values.effectiveTime = values.effectiveTime._i;
                values.invalidTime = values.invalidTime._i;
                values.marketingTypeInt = this.props.formState.marketingTypeInt;
                onSaveRule(values);
            }
        });
    }

    onMarketingModelChange = (value) => {
        console.log(value);
    }
    componentDidMount() {
        // 初始请求列表数据，首屏10条数据
        const { strategyList, match } = this.props;
        const id = match.params.id;
        strategyList(id);
    }
    displayTime() {
        const { getFieldDecorator } = this.props.form;
        const { formState } = this.props;
        const { pagetype } = this.state;
        let editDis = true, invalidTimeDis = true;

        // 修改页面失效时间、失效时间进行判断
        if (pagetype === false) {
            // 开始有效时间可以选择时间的
            if (formState.strategyState === '未开始' || formState.strategyState === '待开始') {
                editDis = false;
            } else {
                editDis = true;
            }
            // 结束有效时间可以选择时间的
            if (formState.strategyState === '已过期' || formState.strategyState === '已完成') {
                invalidTimeDis = true;
            } else {
                invalidTimeDis = false;
            }
        }
        return (
            <div className="displaytime">
                <Row>
                    <Col style={{ textAlign: 'left' }}>
                        <FormItem label="生效时间" {...formItemLayout} hasFeedback={false}>
                            {getFieldDecorator('effectiveTime', {
                                initialValue: moment(formState.effectiveTime),
                                rules: [{
                                    required: true, message: '生效时间不能为空！',
                                }],
                            })(
                                <DatePicker
                                    style={{ width: '100%' }}
                                    disabledDate={this.disabledStartDate}
                                    showTime={{ format: 'HH:mm:ss' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    // disabledDate={disabledDate}
                                    // disabledTime={this.disabledDateTime}
                                    placeholder={formState.effectiveTime}
                                    onChange={this.onStartChange}
                                    disabled={editDis}
                                />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="失效时间" {...formItemLayout} hasFeedback={false}>
                        {getFieldDecorator('invalidTime', {
                            initialValue: moment(formState.invalidTime),
                            rules: [{
                                required: true, message: '策略名称不能为空！',
                            }],
                        })(
                            <DatePicker
                                style={{ width: '100%' }}
                                disabledDate={this.disabledEndDate}
                                showTime={{ format: 'HH:mm:ss' }}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={formState.invalidTime}
                                onChange={this.onEndChange}
                                disabled={invalidTimeDis}
                            />
                            )}
                    </FormItem>
                </Row>
            </div>

        );
    }
    orderRules() {
        // 触发规则拼写规则的拼写规则
        const { formState } = this.props;
        let ruleList, ruleListArray, strategyType;
        ruleList = formState.ruleList;
        strategyType = formState.strategyType;
        console.log(formState);
        if (ruleList !== undefined) {
            // 订单触发
            if (strategyType === '订单触发') {
                ruleListArray = [
                    {
                        name: '触发事件：',
                        value: '订单事件'
                    },
                    {
                        name: '服务项:',
                        value: formState.ruleList[0].refer
                    },
                    {
                        name: '订单来源:',
                        value: formState.ruleList[0].orderSource
                    },
                    {
                        name: '订单状态:',
                        value: formState.ruleList[0].orderStatus
                    },
                    {
                        name: '城市:',
                        value: formState.ruleList[0].city
                    },
                ];
            }
            // 导入用户
            if (strategyType === '导入用户') {
                ruleListArray = [
                    {
                        name: '触发事件：',
                        value: '导入用户'
                    },
                    {
                        name: '批次id：',
                        value: formState.batchUserInfo.batchId
                    },
                    {
                        name: '用户数量：',
                        value: formState.batchUserInfo.userCount
                    },
                    {
                        name: '导入状态：',
                        value: formState.batchUserInfo.importState === 1 ? '未导入' : formState.batchUserInfo.importState === 2 ? '导入完成' : formState.batchUserInfo.importState === 2 ? '导入完成' : ''
                    },
                ];
            }
            // 支付预约页面
            if (strategyType === '支付预约页面') {
                ruleListArray = [
                    {
                        name: '触发事件：',
                        value: '支付预约页面营销'
                    },
                    {
                        name: '服务项：',
                        value: formState.ruleList[0].refer
                    },
                    {
                        name: '订单来源：',
                        value: formState.orderSource
                    },
                ];
            }
            // 全部用户
            if (strategyType === '全部用户') {
                ruleListArray = [
                    {
                        name: '触发事件：',
                        value: '全部用户'
                    }
                ];
            }
            ruleListArray = ruleListArray.map((item, i) => {
                return <p key={i}><label>{item.name}</label><span >{item.value}</span></p>;
            });
            return (
                <Row>
                    <Col style={{ textAlign: 'left', background: '#eee', padding: '10px 0px', border: '1px solid #ccc' }}>
                        <FormItem className="strategyOrderRules" label="触发规则" {...formItemLayout} style={{ margin: '0' }}>
                            <div className="orderRules">
                                <section className="showInfo">
                                    {ruleListArray}
                                </section>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            );
        } else {
            return ('');
        }
    }
    buttonMain() {
        const { pagetype } = this.state;
        if (pagetype === false) {
            return (
                <Row>
                    <FormItem style={{ width: '100%' }}>
                        <Button type="primary" onClick={this.onSave} style={{ marginLeft: '138px' }}>创建策略</Button>
                        <Button style={{ marginLeft: '10px' }}>取消</Button>
                    </FormItem>
                </Row>
            );
        } else {
            return (
                <Row>
                    <FormItem style={{ width: '100%' }}>
                        <Button style={{ marginLeft: '138px' }}>返回</Button>
                    </FormItem>
                </Row>
            );
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formState, actionParam, strategyMarketingType } = this.props;
        const { pagetype, editing, editDis, showOrderDetailCheck } = this.state;
        return (
            <div id="detailOrder">
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">营销管理平台</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{pagetype ? '策略详情' : '修改策略'}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Form className="form-box">
                            <Row>
                                <Col style={{ textAlign: 'left' }}>
                                    <FormItem label="修改记录" {...formItemLayout} >
                                        {getFieldDecorator('pkId', {
                                            rules: [{
                                                required: true, message: '修改记录不能为空！',
                                            }],
                                            initialValue: formState.pkId,
                                        })(
                                            <span>{formState.updateContent}</span>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <FormItem label="策略名称" {...formItemLayout} >
                                    {getFieldDecorator('strategyName', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                        initialValue: formState.strategyName,
                                    })(
                                        <Input placeholder={formState.strategyName} maxLength="30" disabled={pagetype} />
                                        )}
                                </FormItem>
                            </Row>
                            {this.displayTime()}

                            {this.orderRules()}
                            <Row className="setDelayTime">
                                <Col span={3} className="delayTimeLabel"><label>延迟时间：</label></Col>
                                <Col span={3}>
                                    <FormItem hasFeedback={false}>
                                        {getFieldDecorator('dayDelay', {
                                            rules: [{
                                                required: true, message: '延迟时间不能为空！',
                                            }],
                                            initialValue: actionParam.dayDelay,
                                        })(
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{ width: '90%' }}
                                                disabled={editDis}
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={1}>
                                    <span className="lh30">天</span>
                                </Col>
                                <Col span={3}>
                                    <FormItem>
                                        {getFieldDecorator('minuteDelay', {
                                            rules: [{
                                                required: true, message: '延迟时间不能为空！',
                                            }],
                                            initialValue: actionParam.minuteDelay,
                                        })(
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{ width: '90%' }}
                                                disabled={editDis}
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={1}>
                                    <span className="lh30">分钟</span>
                                </Col>
                            </Row>
                            <Row>
                                <FormItem label="推送限制" {...formItemLayout} >
                                    {getFieldDecorator('marketingLimit', {
                                        rules: [{
                                            required: true, message: '推送限制不能为空！',
                                        }],
                                        initialValue: formState.marketingLimit,
                                    })(
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            style={{ width: 80 }}
                                            disabled={editDis}
                                        />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem className="strategyMarketingType" label="营销类别" {...formTypeLayout} >
                                    <RadioGroup value={formState.marketingTypeInt} onChange={this.onRadioChange} style={{ width: '100%' }}>
                                        {
                                            strategyMarketingType.map((item) => {
                                                return <Radio value={item.id} key={item.id} disabled={pagetype}>{item.name}</Radio>;
                                            })
                                        }
                                    </RadioGroup>
                                </FormItem>
                            </Row>
                            <Row style={(editing && formState.marketingTypeInt !== 1) ? { display: 'none' } : { display: 'block' }}>
                                <FormItem label="优惠券" {...formItemLayout} >
                                    {getFieldDecorator('activityId', {
                                        rules: [{
                                            required: true, message: '优惠券不能为空！',
                                        }],
                                        initialValue: formState.activityId,
                                    })(
                                        <Input style={{ width: 80 }} placeholder={formState.activityId} maxLength="30" disabled={pagetype} />
                                        )}
                                </FormItem>
                            </Row>

                            <Row>
                                <FormItem {...formItemLayoutMarketingModel} label="营销方式" hasFeedback={false}>
                                    {getFieldDecorator('marketingModel', {
                                        rules: [{
                                            required: true, message: '营销方式不能为空！',
                                        }],
                                        initialValue: [
                                            // { type: '1', value: { type: '1', docs: '111', link: '222' } },
                                            // { type: '2', value: { type: '2', docs: '111', link: '222', title: '22222' } }
                                        ]
                                    })(
                                        <MarketingModel
                                            form={this.props.form}
                                            stage={0}
                                            option={formState.weChatPush}
                                            showOrderDetailCheck={showOrderDetailCheck}
                                            onChange={this.onMarketingModelChange}
                                        />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="责任人" {...formItemLayout} >
                                    {getFieldDecorator('createrEmail', {
                                        rules: [{
                                            required: true, message: '责任人不能为空！',
                                        }],
                                        initialValue: formState.createrEmail,
                                    })(
                                        <Input placeholder={formState.createrEmail} maxLength="30" disabled={true} />
                                        )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="修改状态" {...formItemLayout} >
                                    {getFieldDecorator('strategyState', {
                                        rules: [{
                                            required: true, message: '修改状态不能为空！',
                                        }],
                                        initialValue: formState.strategyState,
                                    })(
                                        <Input placeholder={formState.strategyState} maxLength="30" disabled={true} />
                                        )}
                                </FormItem>
                            </Row>
                            {this.buttonMain()}
                        </Form>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        北京58到家信息技术有限公司 ©2017 营销系统
                    </Footer>
                </Layout>
            </div>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create()(DetailOrderStrategy as any);
export function mapStateToProps(state: StoreState) {
    return {
        formState: state.detailOrderStrategy.formState,
        actionParam: state.detailOrderStrategy.actionParam,
        strategyMarketingType: state.detailOrderStrategy.strategyMarketingType
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.DetailOrderStrategyType>) => bindActionCreators(
    {
        strategyList: actions.DetailOrderStrategy,
        onSaveRule: actions.OnSaveRule
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAdvancedSearchForm as any));