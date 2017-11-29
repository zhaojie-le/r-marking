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
import { MarketingOrderModel } from '../../components';
const FormItem = Form.Item;
const {Content} = Layout;
const RadioGroup = Radio.Group;

export interface Props {
    strategyList: () => void;
    formState?: any;
    form?: any;
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
class List extends React.Component<Props, object> {
    state= {
        pagetype: window.location.href.indexOf('changeDetail') > 0 ? false : true,
        startValue: '',
        endValue: '',
        endOpen: false,
        // value: '',
        editing: true
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
    // console.log('radio checked', e.target.value);
    this.props.formState.marketingTypeInt = e.target.value;
    // this.setState({
    //   value: e.target.value,
    // });
    if ( e.target.value === 1) {
        this.setState({
            editing: false,
          });
    } else {
        this.setState({
            editing: true,
          });
    }
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
buttonMain () {
  const { pagetype } = this.state;
  if (pagetype === false) {
    return (
        <Row>
        <FormItem style={{width: '100%'}}>
            <Button type="primary" onClick={() => console.log(22)} style={{marginLeft: '138px'}}>创建策略</Button>
            <Button onClick={() => console.log(12)} style={{marginLeft: '10px'}}>取消</Button>
        </FormItem>
      </Row>
     );
  } else {
      return (
        <Row>
        <FormItem style={{width: '100%'}}>
            <Button onClick={() => console.log(12)} style={{marginLeft: '138px'}}>返回</Button>
        </FormItem>
        </Row> 
      );
  }
}
render() {
const { getFieldDecorator} = this.props.form;
const { formState , form } = this.props;
const { pagetype } = this.state;

let dayDelay, minuteDelay;
if ( formState.actionParam !== undefined) {
    dayDelay = formState.actionParam.dayDelay;
    minuteDelay = formState.actionParam.minuteDelay;
}

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
if ( pagetype === false) {
    // 开始有效时间可以选择时间的
    if ( formState.strategyState === '未开始' || formState.strategyState === '待开始') {
        effectiveTimeDis = false;
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
        return <Radio value={item.id} key={item.id} disabled={pagetype}>{item.name}</Radio>
       });
}

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
        <Col style={{ textAlign: 'left' }}>
                <FormItem label="触发规则" {...formItemLayout} >
                {getFieldDecorator('delayDay', {
                        rules: [{
                            required: true, message: '延迟时间不能为空！',
                        }],
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
            <FormItem label="营销类别" {...formTypeLayout} >
                <RadioGroup value={formState.marketingTypeInt} onChange={this.onRadioChange}  style={{width: '100%'}}>
                    {strategyTypeChildren}
                    {/* <Radio value={1} disabled={pagetype}>A</Radio>
                    <Radio value={2} disabled={pagetype} >B</Radio>
                    <Radio value={3} disabled={pagetype}>C</Radio>
                    <Radio value={4} disabled={pagetype}>D</Radio> */}
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
                    <Input placeholder={formState.strategyName} maxLength="30" disabled={pagetype}/>                    
                )}
            </FormItem>
        </Row>
                
        <Row>
            <MarketingOrderModel 
                form={form} 
                onSaveModel={this.props.onSaveModel}
                formState={formState}
            />
            {/* <FormItem label="营销方式" {...formItemLayout} >
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
            </FormItem> */}
          
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
        {this.buttonMain()}
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