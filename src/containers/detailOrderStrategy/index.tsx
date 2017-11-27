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
}

class List extends React.Component<Props, object> {
    state= {
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
const { getFieldDecorator } = this.props.form;
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
                    {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '策略名称不能为空！',
                        }],
                    })(
                      <span>无</span>
                    )}
                    </FormItem>
                </Col>
            </Row>
        <Row>
            <FormItem label="策略名称" {...formItemLayout} >
                {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '策略名称不能为空！',
                        }],
                    })(
                        <Input placeholder="text2" maxLength="30"/>
                )}
            </FormItem>
        </Row>
        <Row>
            <Col style={{ textAlign: 'left' }}>
                <FormItem label="生效时间" {...formItemLayout} >
                {getFieldDecorator('starttime', {
                        rules: [{
                            required: true, message: '策略名称不能为空！',
                        }],
                    })(
                        <DatePicker
                            style={{ width: '100%' }}
                            disabledDate={this.disabledStartDate}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Start"
                            onChange={this.onStartChange}
                        />  
                )}
                </FormItem>
            </Col>
        </Row>
        <Row>
        <FormItem label="生效时间" {...formItemLayout} >
            {getFieldDecorator('endtime', {
                    rules: [{
                        required: true, message: '策略名称不能为空！',
                    }],
                })(
                    <DatePicker
                        style={{ width: '100%' }}
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="End"
                        onChange={this.onEndChange}
                    />
            )}
        </FormItem>
        </Row>
        <Row>
        <Col style={{ textAlign: 'left' }}>
                <FormItem label="触发规则" {...formItemLayout} >
                        <div>
                        触发事件：订单事件
                        服务项：面包车搬家，箱式货车搬家，搬家
                        订单来源：全部，到家app,微信，其他h5
                        </div>
                </FormItem>
        </Col>
        </Row>
        <Row className="setDelayTime">
            <Col span={3} className="delayTimeLabel"><label>延迟时间：</label></Col>
            <Col span={3}>
                <FormItem hasFeedback={false}>
                    {getFieldDecorator('delayDay', {
                        rules: [{
                            required: true, message: '策略名称不能为空！',
                        }],
                        initialValue: 0,
                    })(
                        <InputNumber
                            min={0}
                            max={100}
                            style={{width: '90%'}}
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
                            required: true, message: '策略名称不能为空！',
                        }],
                        initialValue: 0,
                    })(
                        <InputNumber
                            min={0}
                            max={100}
                            style={{width: '90%'}}
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
                {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '推送限制不能为空！',
                        }],
                    })(
                    <InputNumber
                        min={0}
                        max={100}
                        style={{width: '90%'}}
                    />
                )}
            </FormItem>
        </Row>
        <Row>
            <FormItem label="营销类别" {...formItemLayout} >
                {getFieldDecorator('ystragyName', {
                        rules: [{
                            required: true, message: '营销类别不能为空！',
                        }],
                    })(
                    <RadioGroup value={this.state.value}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                      </RadioGroup>
                )}
            </FormItem>
        </Row>
        <Row>
            <FormItem label="绑定活动id" {...formItemLayout} >
                {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '绑定活动不能为空！',
                        }],
                    })(
                    <InputNumber
                        min={0}
                        max={100}
                        style={{width: '90%'}}
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
                    />
                )}
            </FormItem>
        </Row>
        <Row>
            <FormItem label="责任人" {...formItemLayout} >
                {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '责任人不能为空！',
                        }],
                    })(
                        <Input placeholder="text2" maxLength="30"/>
                )}
            </FormItem>
        </Row>
        <Row>
            <FormItem label="修改状态" {...formItemLayout} >
                {getFieldDecorator('stragyName', {
                        rules: [{
                            required: true, message: '修改状态不能为空！',
                        }],
                    })(
                        <Input placeholder="text2" maxLength="30"/>
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