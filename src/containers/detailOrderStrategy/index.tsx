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
import { DetailMarketingModel, StrategyCreater } from '../../components';
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
    state: any = {
        pagetype: window.location.href.indexOf('#edit') > 0 ? false : true,
        startValue: '',
        endValue: '',
        endOpen: false,
        editing: true,
        editDis: true,
        eventType: 0
        //  false
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
    // 营销类别
    onMarketingTypeChange = (value) => {
        console.log(value);
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
        if (pagetype === false) {
            editDis = formState.strategyState === '未开始' || formState.strategyState === '待开始' ?
                false : true;
            invalidTimeDis = formState.strategyState === '已过期' || formState.strategyState === '已完成' ?
                false : true;
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
    marketingModel() {
        const { formState } = this.props;
        const actionExpressionstate: any = [];
        // [[1, '短信'], [2, '58到家-APP push'], [3, '58速运-APP push'], [4, '58到家公众号'], [5, '支付预约'], [6, '页面挂件'], [7, '首页运营位']]
        // 1-微信公众号、2-APP推送，3-短信，4-支付预约页，5-优惠券，6-速运APP，7-页面挂件，9-首页运营位
        // { type: '4', value: { firparagraph: formState.firstData, lastparagraph: formState.remarkData, link: formState.openUrl } }
        let actionExpression = formState.actionExpression;
        // formState.wechatContent.openUrl
        if (actionExpression !== undefined) {
            actionExpression.forEach((item, index) => {
                switch (item) {
                    case '1':
                        actionExpressionstate.push({
                            type: '4',
                            value: {
                                type: '4',
                                first: formState.wechatContent.firstData,
                                remark: formState.wechatContent.remarkData,
                                link: formState.categoryId === 201 ? '订单详情页面' : (formState.categoryId === 212 || formState.bussniessId === 104) ? '订单评价页面' : formState.wechatContent.openUrl,
                                tstate: formState.wechatTemplate.value === '1' ? '下单成功' : formState.wechatTemplate.value === '2' ? '待支付通知' : formState.wechatTemplate.value === '4' ? '订单已完成' : '',
                            }
                        });
                        break;
                    case '2':
                        actionExpressionstate.push({
                            type: '2',
                            value: {
                                type: '2',
                                title: formState.appContent.title,
                                docs: formState.appContent.appContent,
                                link: formState.categoryId === 201 ? '订单详情页面' : (formState.categoryId === 212 || formState.bussniessId === 104) ? '订单评价页面' : formState.appContent.openUrl,
                            }
                        });
                        break;
                    case '3':
                        actionExpressionstate.push({
                            type: '1',
                            value: {
                                type: '1',
                                docs: formState.smsContent.smsContent,
                                link: (formState.categoryId === 212 || formState.bussniessId === 104) ? '订单评价页面' : formState.smsContent.openUrl,
                            }
                        });
                        break;
                    case '4':
                        actionExpressionstate.push({
                            type: '5',
                            value: {
                                type: '5',
                                icon: formState.payOrderContent.imgUrl,
                                docs: formState.payOrderContent.openUrl,
                                link: formState.payOrderContent.openUrl
                            }
                        });
                        break;
                    case '6':
                        actionExpressionstate.push({
                            type: '3',
                            value: {
                                type: '3',
                                title: formState.expressContent.title,
                                docs: formState.expressContent.appContent,
                                link: formState.expressContent.openUrl
                            }
                        });
                        break;
                    case '7':
                        actionExpressionstate.push({
                            type: '6',
                            value: {
                                type: '6',
                                imgUrl: formState.pendantContent.imgUrl,
                                link: formState.pendantContent.openUrl,
                                animation: formState.pendantContent.animation,
                                position: formState.pendantContent.location
                            }
                        });
                        break;
                    case '9':
                        actionExpressionstate.push({
                            type: '7',
                            value: {
                                type: '7',
                                icon: formState.homePageContent.imgUrl,
                                link: formState.homePageContent.openUrl,
                            }
                        });
                        break;
                    default:
                        break;
                }
            });
            return actionExpressionstate;
        }
    }
    buttonMain = () => {
        const { pagetype } = this.state;
        const buttonMainHtml = pagetype === false ?
            (
                <div className="buttonmain">
                    <Row>
                        <FormItem style={{ width: '100%' }}>
                            <Button type="primary" onClick={this.onSave} style={{ marginLeft: '138px' }}>创建策略</Button>
                            <Button style={{ marginLeft: '10px' }}>取消</Button>
                        </FormItem>
                    </Row>
                </div>
            ) :
            (
                <div className="buttonmain">
                    <Row>
                        <FormItem style={{ width: '100%' }}>
                            <Button style={{ marginLeft: '138px' }}>返回</Button>
                        </FormItem>
                    </Row>
                </div>
            );
        return buttonMainHtml;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formState, actionParam, strategyMarketingType } = this.props;
        const { pagetype, editing, editDis, eventType } = this.state;

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
                            {formState.ruleList !== undefined && formState.strategyTypeInt !== 0 ?
                                < Row style={{ margin: '0 0 20px 0' }}>
                                    <Col style={{ textAlign: 'left', background: '#eee', padding: '10px 0px', border: '1px solid #ccc' }}>
                                        <FormItem className="strategyOrderRules" label="触发规则" {...formTypeLayout} style={{ margin: '0' }}>
                                            <div className="orderRules">
                                                <section className="showInfo">
                                                    {formState.ruleList.map((item, i) => {
                                                        return <p key={i}><label>{item.name}:&nbsp;&nbsp;</label><span >{item.value}</span></p>;
                                                    })
                                                    }
                                                </section>
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row> : ''}
                            {formState.userCondition || formState.notLoggedMarket ?
                                <Row>
                                    <Col style={{ textAlign: 'left', background: '#eee', padding: '10px 0px', border: '1px solid #ccc' }}>
                                        <FormItem className="strategyOrderRules" label="触发条件" {...formItemLayout} style={{ margin: '0' }}>
                                            <div className="orderRules">
                                                <section className="showInfo">
                                                    {formState.userCondition.map((item, i) => {
                                                        return <p key={i}><label>{item.name}:&nbsp;&nbsp;</label><span >{item.value}</span></p>;
                                                    })}
                                                </section>
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row> : ''}
                            {formState.strategyType === '订单触发' ?
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
                                </Row> : ''}
                            {formState.strategyType === '订单触发' ?
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
                                </Row> : ''}
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
                            <FormItem {...formTypeLayout} label="营销类别" hasFeedback={false}>
                                {
                                    getFieldDecorator('marketingType', {
                                        rules: [{
                                            required: true, message: '营销类别不能为空！',
                                        }],
                                    })(
                                        <StrategyCreater onChange={this.onMarketingTypeChange} form={this.props.form} strategyType={eventType} />
                                        )
                                }
                            </FormItem>
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
                            {this.marketingModel() !== undefined ?
                                <Row>
                                    <FormItem {...formItemLayoutMarketingModel} label="营销方式" hasFeedback={false}>
                                        {getFieldDecorator('marketingModel', {
                                            rules: [{
                                                required: true, message: '营销方式不能为空！',
                                            }],
                                            initialValue: this.marketingModel(),
                                        })(
                                            < DetailMarketingModel
                                                form={this.props.form}
                                                stage={formState.strategyState === '待开始' || '未开始' ? 0 : 1}
                                                page={pagetype}
                                            />
                                            )}
                                    </FormItem>
                                </Row> : ''}
                            < Row >
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
            </div >
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