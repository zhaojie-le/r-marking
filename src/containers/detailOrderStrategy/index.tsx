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
const FormItem = Form.Item;
const {Content} = Layout;
const RadioGroup = Radio.Group;

export interface Props {
    param: {};
    actionParam: {};
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
class DetailOrderStrategy extends React.Component<Props, object> {
    state= {
        pagetype: window.location.href.indexOf('#edit') > 0 ? false : true,
        startValue: '',
        endValue: '',
        endOpen: false,
        editing: true,
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

    componentDidMount() {
        // 初始请求列表数据，首屏10条数据
        const { strategyList, match} = this.props;
        const id = match.params.id;
        strategyList(id);
    }

    buttonMain () {
        const { pagetype } = this.state;
        if (pagetype === false) {
            return (
                <Row>
                    <FormItem style={{width: '100%'}}>
                        <Button type="primary" onClick={this.onSave} style={{marginLeft: '138px'}}>创建策略</Button>
                        <Button style={{marginLeft: '10px'}}>取消</Button>
                    </FormItem>
                </Row>
            );
        } else {
            return (
                <Row>
                    <FormItem style={{width: '100%'}}>
                        <Button style={{marginLeft: '138px'}}>返回</Button>
                    </FormItem>
                </Row> 
            );
        }
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        const { formState} = this.props;
        const { pagetype } = this.state;

         // 生效、和失效时间的初始化
        let dayDelay, minuteDelay;
        if ( formState.actionParam !== undefined) {
            dayDelay = formState.actionParam.dayDelay;
            minuteDelay = formState.actionParam.minuteDelay;
        }

        // 触发规则拼写规则的拼写规则
        let ruleList, ruleListArray;
        ruleList = formState.ruleList;
        if ( ruleList !== undefined ) {
            ruleListArray = [
                {
                    name: '服务项:',
                    value: formState.ruleList[0].refer
                },
                {
                    name: '订单来源:',
                    value: formState.ruleList[1].orderSource
                },
                {
                    name: '订单状态:',
                    value: formState.ruleList[2].orderStatus
                },
                {
                    name: '城市:',
                    value: formState.ruleList[3].city
                },
            ]; 
            
            ruleListArray = ruleListArray.map((item, i) => {
                return <p key={i}><label>{item.name}</label><span >{item.value}</span></p>;
            });
        }

        // 修改页面失效时间、失效时间进行判断
        let effectiveTimeDis = true, invalidTimeDis  = true;
        let dayDelayDis = true, minuteDelayDis = true, marketingLimitDis = true;
        if ( pagetype === false) {
            // 开始有效时间可以选择时间的
            if ( formState.strategyState === '未开始' || formState.strategyState === '待开始') {
                effectiveTimeDis = false;
                dayDelayDis = false;
                minuteDelayDis = false;
                marketingLimitDis = false;
            } 
            // 结束有效时间可以选择时间的
            if ( formState.strategyState === '已过期' || formState.strategyState === '已完成') {
                invalidTimeDis = false;
            } 
        } 

        // 营销类别的展示
        let strategyMarketingType = formState.strategyMarketingType, strategyTypeChildren;
        if ( strategyMarketingType !== undefined) {
            strategyTypeChildren = strategyMarketingType.map((item) => {
                return <Radio value={item.id} key={item.id} disabled={pagetype}>{item.name}</Radio>;
            });
        }
        // 营销类别优惠券规则
        let editStyle;
        if (this.state.editing && formState.marketingTypeInt !== 1) {
            editStyle = {display: 'none'};
        } else {
            editStyle = {display: 'block'};
        }

        return (
            <div id="detailOrder">
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">营销管理平台</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>策略详情</Breadcrumb.Item>
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
                                        <Input placeholder={formState.strategyName} maxLength="30" disabled={pagetype}/>
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'left' }}>
                                    <FormItem label="生效时间" {...formItemLayout} >
                                        {getFieldDecorator('effectiveTime', {
                                            initialValue: moment(formState.effectiveTime), 
                                            rules: [{
                                                required: true, message: '生效时间不能为空！',
                                            }],
                                        })(
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                disabledDate={this.disabledStartDate}
                                                format="YYYY-MM-DD HH:mm:ss"
                                                placeholder={formState.effectiveTime}
                                                onChange={this.onStartChange}
                                                disabled={effectiveTimeDis}
                                            />  
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <FormItem label="失效时间" {...formItemLayout} >
                                    {getFieldDecorator('invalidTime', {
                                        initialValue: moment(formState.invalidTime),
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            disabledDate={this.disabledEndDate}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder={formState.invalidTime}
                                            onChange={this.onEndChange}
                                            disabled={invalidTimeDis}
                                        />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>  
                                <Col style={{ textAlign: 'left', background: '#eee', padding: '10px 0px', border: '1px solid #ccc'}}>
                                    <FormItem label="触发规则" {...formItemLayout}  style={{ margin: '0' }}>
                                        {getFieldDecorator('orderRules', {
                                            rules: [{
                                                required: true, message: '延迟时间不能为空！',
                                            }],
                                            initialValue: '11',
                                        })(
                                            <div className="orderRules">
                                                <section className="showInfo">
                                                {ruleListArray}
                                                </section>
                                            </div>
                                        )} 
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className="setDelayTime">
                                <Col span={3} className="delayTimeLabel"><label>延迟时间：</label></Col>
                                <Col span={3}>
                                    <FormItem hasFeedback={false}>
                                        {getFieldDecorator('dayDelay', {
                                            rules: [{
                                                required: true, message: '延迟时间不能为空！',
                                            }],
                                            initialValue: dayDelay,
                                        })(
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{width: '90%'}}
                                                disabled={dayDelayDis}
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
                                            initialValue: minuteDelay,
                                        })(
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                style={{width: '90%'}}
                                                disabled={minuteDelayDis}
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
                                            style={{width: 80}}
                                            disabled={marketingLimitDis}
                                        />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem className="strategyMarketingType" label="营销类别" {...formTypeLayout} >
                                    <RadioGroup  value={formState.marketingTypeInt} onChange={this.onRadioChange}  style={{width: '100%'}}>
                                        {strategyTypeChildren}
                                    </RadioGroup>
                                </FormItem>
                            </Row>
                            <Row  style={editStyle}>
                                <FormItem label="优惠券" {...formItemLayout} >
                                    {getFieldDecorator('activityId', {
                                        rules: [{
                                            required: true, message: '优惠券不能为空！',
                                        }],
                                        initialValue: formState.activityId,
                                    })(
                                        <Input style={{width: 80}} placeholder={formState.activityId} maxLength="30" disabled={pagetype}/>                    
                                    )}
                                </FormItem>
                            </Row>
                        
                            {/* <Row>
                                <MarketingOrderModel 
                                    form={form} 
                                    onSaveModel={this.props.onSaveModel}
                                    formState={formState}
                                />
                            </Row> */}
                            <Row>
                                <FormItem label="责任人" {...formItemLayout} >
                                    {getFieldDecorator('createrEmail', {
                                        rules: [{
                                            required: true, message: '责任人不能为空！',
                                        }],
                                        initialValue: formState.createrEmail,
                                    })(
                                        <Input placeholder={formState.createrEmail} maxLength="30" disabled={true}/>
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
                                        <Input placeholder={formState.strategyState} maxLength="30" disabled={true}/>
                                    )}
                                </FormItem>
                            </Row>
                            {this.buttonMain()}
                        </Form>
                    </Content>
                </Layout>
            </div>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create()(DetailOrderStrategy as any);
export function mapStateToProps(state: StoreState) {
    return {
        formState: state.detailOrderStrategy.formState,
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