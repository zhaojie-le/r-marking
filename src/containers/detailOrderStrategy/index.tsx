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
    Button,
    Select
} from 'antd';
import { DetailMarketingModel } from '../../components';
const FormItem = Form.Item;
const { Content, Footer } = Layout;
const Option = Select.Option;

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
        editDis: true
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

    onSelectChange = (e) => {
        console.log(e);
        this.props.formState.marketingTypeInt = e;
        const isEditing = (e).toString() === '1' ? false : true;
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
                values.marketingModel = this.mergeParmas(values);
                delete values.keys;
                onSaveRule(values);
            }
        });
    }
    mergeParmas = (values) => {
        let newPar: any = {};
        let valueArr = Object.entries(values);
        console.log('valueArr', valueArr);
        let valueArrLen = valueArr.length;
        for (let i = 0; i < valueArrLen; i++) {
            let item0 = valueArr[i][0];
            let item1 = valueArr[i][1];
            if (item0.startsWith('marketingModel')) {
                // 营销方式
                newPar.actionParam = item1;
                newPar.actionExpression = item1.keys.toString();
            }
        }
        newPar.actionParam = newPar.actionParam ? this.actionParamsMap(newPar.actionParam) : null;
        console.log('newPar', newPar);
        return newPar;
    }

    actionParamsMap = (obj) => {
        let actionP: any = {};
        if (obj) {
            let objArray = Object.entries(obj);
            let objArrLen = objArray.length;
            for (let i = 0; i < objArrLen; i++) {
                if (objArray[i][0].startsWith('daojiaApp')) {
                    actionP.appContent = this.contentMap(objArray[i][1]);
                } else if (objArray[i][0].startsWith('sms')) {
                    actionP.smsContent = this.contentMap(objArray[i][1]);
                } else if (objArray[i][0].startsWith('suyunApp')) {
                    actionP.expressContent = this.contentMap(objArray[i][1]);
                } else if (objArray[i][0].startsWith('chatNumber')) {
                    actionP.wechatContent = this.chartNumberMap(objArray[i][1]);
                }
            }
            return actionP;
        }
        return null;
    }

    contentMap = (objItem) => {
        let newContent: any = {};
        if (objItem) {
            if (objItem.title) {
                newContent.title = objItem.title;
            } else if (objItem.docs) {
                newContent.content = objItem.docs;
            } else if (objItem.link) {
                newContent.openUrl = objItem.link;
            }
        }
        return newContent;
    }
    chartNumberMap = (objItem) => {
        let newContent: any = {};
        newContent.firstData = objItem.first ? objItem.first : '';
        newContent.remarkData = objItem.remark ? objItem.remark : '';
        newContent.pushStatus = objItem.pushStatus ? objItem.pushStatus : '';
        if (objItem.linkInput) {
            // 默认订单详情
            newContent.gotoOrderPage = 1;
        } else {
            // 输入的跳转链接
            newContent.gotoOrderPage = 0;
            newContent.openUrl = objItem.link;
        }
        return newContent;
    }

    // 营销类别
    onMarketingTypeChange = (value) => {
        console.log(value);
    }
    onMarketingModelChange = (value) => {
        console.log(value);
    }
    componentDidMount() {
        const { strategyList, match } = this.props;
        const id = match.params.id;
        strategyList(id);
    }
    marketingType() {
        const { getFieldDecorator } = this.props.form;
        const { formState, strategyMarketingType } = this.props;
        const { pagetype, editing } = this.state;
        return (
            <div>
                <FormItem className="strategyMarketingType" label="营销类别" {...formTypeLayout} >
                    <Select
                        value={(formState.marketingTypeInt === undefined ? (0).toString() : formState.marketingTypeInt).toString()}
                        style={{ width: '200px' }}
                        onChange={this.onSelectChange}
                        disabled={pagetype}
                    >
                        {
                            strategyMarketingType.map((item) => {
                                return <Option value={(item.id).toString()} key={item.id}>{item.name}</Option>;
                            })
                        }
                    </Select>
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
            </div>
        );
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
        // 组件数据对应[[1, '短信'], [2, '58到家-APP push'], [3, '58速运-APP push'], [4, '58到家公众号'], [5, '支付预约'], [6, '页面挂件'], [7, '首页运营位']]
        // 接口的数据 1-微信公众号、2到家-APP推送，3-短信，4-支付预约页，5-优惠券，6-速运APP，7-页面挂件，9-首页运营位
        // { type: '4', value: { firparagraph: formState.firstData, lastparagraph: formState.remarkData, link: formState.openUrl } }
        let actionExpression = formState.actionExpression;
        // formState.wechatContent.openUrl
        // 品类只是判断categoryId是否展示按钮
        // 微信公众号：2，1 link: formState.categoryId === 201 ? '订单详情页面' : (formState.categoryId === 212 || formState.bussniessId === 104) ? '订单评价页面' : formState.wechatContent.openUrl,
        // 短信：3link: (formState.categoryId === 212 || formState.bussniessId === 104) ? '订单评价页面' : formState.smsContent.openUrl,
        // 1 formState.wechatTemplate.value === '1' ? '下单成功' : formState.wechatTemplate.value === '2' ? '待支付通知' : formState.wechatTemplate.value === '4' ? '订单已完成' : '',
        // onShowOrderDetailCheck 1订单详情，2订单评价 0不展示
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
                                link: formState.wechatContent.openUrl === '' ? 'xxx' : formState.wechatContent.openUrl,
                                showOrderDetailCheck: formState.wechatContent.openUrl === '' ?
                                    (formState.wechatContent.gotoOrderEvaluationPage === 1 ?
                                        2 : formState.wechatContent.gotoOrderPage === 1 ?
                                            1 : 0) : 0,
                                tstate: formState.wechatContent.pushStatus === 1 ?
                                    '下单成功' : formState.wechatContent.pushStatus === 2 ?
                                        '待支付通知' : formState.wechatContent.pushStatus === 4 ?
                                            '订单已完成' : '',
                            }
                        });
                        break;
                    case '2':
                        actionExpressionstate.push({
                            type: '2',
                            value: {
                                type: '2',
                                title: formState.appContent.title,
                                docs: formState.appContent.content,
                                piclink: formState.appContent.picurl === '' ? 'xxx' : formState.appContent.picurl,
                                activityendtime: formState.appContent.endTime === '' ? 'xxx' : formState.appContent.endTime,
                                link: formState.appContent.openUrl === '' ? 'xxx' : formState.wechatContent.openUrl,
                                showOrderDetailCheck: formState.appContent.openUrl === '' ?
                                    (formState.appContent.gotoOrderEvaluationPage === 1 ?
                                        2 : formState.appContent.gotoOrderPage === 1 ?
                                            1 : 0) : 0,
                            }
                        });
                        break;
                    case '3':
                        actionExpressionstate.push({
                            type: '1',
                            value: {
                                type: '1',
                                docs: formState.smsContent.content,
                                link: formState.smsContent.openUrl === '' ? 'xxx' : formState.wechatContent.openUrl,
                                showOrderDetailCheck: formState.smsContent.openUrl === '' ?
                                    (formState.smsContent.gotoOrderEvaluationPage === 1 ?
                                        2 : 0) : 0,
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
                                docs: formState.expressContent.content,
                                link: formState.expressContent.disposeUrl
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
        const { formState, actionParam } = this.props;
        const { pagetype, editDis } = this.state;

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
                                    <Col style={{ textAlign: 'left', background: '#eee', padding: '10px 0px', border: '1px solid #ccc', margin: '0 0 30px 0' }}>
                                        <FormItem className="strategyOrderRules" label="触发条件" {...formItemLayoutMarketingModel} style={{ margin: '0' }}>
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
                            {this.marketingType()}
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
                                                onChange={this.onMarketingModelChange}
                                                showOrderDetailCheck={0}
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