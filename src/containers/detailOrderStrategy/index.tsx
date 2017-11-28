import * as React from 'react';
import * as actions from '../../actions/';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
    Radio
} from 'antd';

const FormItem = Form.Item;
const {Content} = Layout;
const RadioGroup = Radio.Group;

export interface Props {
    strategyList: () => void;
    formState?: any;
    form?: any;
    value: 1;
}

class List extends React.Component<Props, object> {
    state= {
        pagetype: window.location.href.indexOf('changeDetail') > 0 ? false : true,
        startValue: '',
        endValue: '',
        endOpen: false,
        value: 1,
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
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
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
componentDidMount() {
// 初始请求列表数据，首屏10条数据
    const { strategyList } = this.props;
    strategyList();
}
render() {
const { getFieldDecorator} = this.props.form;
const { formState } = this.props;
const { pagetype } = this.state;
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

let dayDelay, minuteDelay;
if ( formState.actionParam !== undefined) {
    dayDelay = formState.actionParam.dayDelay;
    minuteDelay = formState.actionParam.minuteDelay;
}

let ruleList, refer , orderSource, orderStatus, city;
ruleList = formState.ruleList;
if ( ruleList !== undefined ) {
    refer = ruleList[0].refer;
    orderSource = ruleList[1].orderSource;
    orderStatus = ruleList[2].orderStatus;
    city =  ruleList[3].city;
}

// 修改页面失效时间、失效时间进行判断
let effectiveTimeDis, invalidTimeDis;
console.log(pagetype);
if ( pagetype === false) {
    // 开始有效时间可以选择时间的
    if ( formState.strategyState === '未开始' || formState.strategyState === '待开始') {
        effectiveTimeDis = false;
    } else {
        effectiveTimeDis = true;
    }
    // 结束有效时间可以选择时间的
    if ( formState.strategyState === '已过期' || formState.strategyState === '已完成') {
        invalidTimeDis = false;
    } else {
        invalidTimeDis = true;
    }  
} else {
    // 开始、结束时间都不可以点击
    effectiveTimeDis = true;
    invalidTimeDis = true;
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
        <Col style={{ textAlign: 'left' }}>
                <FormItem label="触发规则" {...formItemLayout} >
                {getFieldDecorator('delayDay', {
                        rules: [{
                            required: true, message: '延迟时间不能为空！',
                        }],
                    })(
                       <div className="orderRules">
                            <section className="showInfo">
                                <p><label>服务项:</label><span>{refer}</span></p>
                                <p><label>订单来源:</label><span>{orderSource}</span></p>
                                <p><label>订单状态:</label><span>{orderStatus}</span></p>
                                <p><label>城市:</label><span>{city}</span></p>
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
                    {getFieldDecorator('delayDay', {
                        rules: [{
                            required: true, message: '延迟时间不能为空！',
                        }],
                        initialValue: dayDelay,
                    })(
                        <InputNumber
                            min={0}
                            max={100}
                            style={{width: '90%'}}
                            disabled={true}
                        />
                    )}
                </FormItem>
            </Col>
            <Col span={1}>
                <span className="lh30">天</span>
            </Col>
            <Col span={3}>
                <FormItem>
                    {getFieldDecorator('delayMinute', {
                        rules: [{
                            required: true, message: '延迟时间不能为空！',
                        }],
                        initialValue: minuteDelay,
                    })(
                        <InputNumber
                            min={0}
                            max={100}
                            style={{width: '90%'}}
                            disabled={true}
                        />
                    )}
                </FormItem>
            </Col>
            <Col span={1}>
                <span className="lh30">分钟</span>
            </Col>
            <Col>
                <p className="payAttention">注：订单状态变更后的X天Y分钟</p>
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
                        disabled={true}
                    />
                )}
            </FormItem>
        </Row>
        <Row>
            <FormItem label="营销类别" {...formItemLayout} >
                {/* {getFieldDecorator('ystragyName', {
                        rules: [{
                            required: true, message: '营销类别不能为空！',
                        }],
                    })(
                    <RadioGroup value={this.state.value}>
                        <Radio value={1} disabled={pagetype}>A</Radio>
                        <Radio value={2} disabled={pagetype} >B</Radio>
                        <Radio value={3} disabled={pagetype}>C</Radio>
                        <Radio value={4} disabled={pagetype}>D</Radio>
                      </RadioGroup>
                )} */}
                <RadioGroup value={this.state.value} onChange={this.onRadioChange}>
                    <Radio value={1} disabled={pagetype}>A</Radio>
                    <Radio value={2} disabled={pagetype} >B</Radio>
                    <Radio value={3} disabled={pagetype}>C</Radio>
                    <Radio value={4} disabled={pagetype}>D</Radio>
                </RadioGroup>
            </FormItem>
        </Row>
        <Row>
            <FormItem label="绑定活动id" {...formItemLayout} >
                {getFieldDecorator('activityId', {
                        rules: [{
                            required: true, message: '绑定活动id不能为空！',
                        }],
                        initialValue: formState.activityId,
                    })(
                    <InputNumber
                        min={0}
                        max={100}
                        style={{width: 80}}
                        disabled={true}
                    />
                )}
            </FormItem>
        </Row>
        <Row>
            <FormItem label="营销方式" {...formItemLayout} >
                {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '绑定活动不能为空！',
                        }],
                    })(
                    <InputNumber
                        min={0}
                        max={100}
                        style={{width: '90%'}}
                        disabled={pagetype}
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
                        <Input placeholder="text2" maxLength="30" disabled={true}/>
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
                        <Input placeholder="text2" maxLength="30" disabled={true}/>
                )}
            </FormItem>
        </Row>
        </Form>
        </Content>
    </Layout>
</div>
);
}
}
const WrappedAdvancedSearchForm = Form.create()(List as any);
export function mapStateToProps(state: StoreState) {
    return {
      formState: state.detailOrderStrategy.formState,
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.DetailOrderStrategyType>) => bindActionCreators(
    {
      strategyList: actions.DetailOrderStrategy,
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAdvancedSearchForm as any));