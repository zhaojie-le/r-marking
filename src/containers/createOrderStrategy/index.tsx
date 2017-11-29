import * as React from 'react';
import * as actions from '../../actions';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
    Form,
    Input,
    Row,
    Col,
    Layout,
    Breadcrumb,
    Button,
    Select,
    InputNumber,
    DatePicker
} from 'antd';
import { StrategyRule, MarketingModel } from '../../components';
import './index.scss';

const { Content, Footer } = Layout;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

export interface Props {
    serviceOptions: any[];
    orderState: any[];
    rules: any[];
    formState: any;
    form: any;
    onGetService: () => void;
    onGetRules: () => void;
    onSaveRule: () => void;
    onSaveModel: (modelData: string) => void;
    onGetOrderState: () => void;
}

export interface DelayTimeProps {
    value?: any;
    onChange?: (value: any) => void;
}

namespace layout {
    export const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 10 },
        },
    };
    
    export const tailFormItemLayout = {
        wrapperCol: { 
            xs: { span: 24, offset: 0, },
            sm: { span: 19, offset: 3, },
        },
    };

    export const formItemLayout2 = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 9 },
        },
    };
}

class DelayTime extends React.Component<DelayTimeProps, {}> {
    constructor(props: any) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            day: value.day || 0,
            munite: value.minute || 0,
        };
    }

    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    handleDayChange = (day) => {
        if (!('value' in this.props)) {
            this.setState({ day });
        }
        this.triggerChange({ day });
    }

    handleMinutChange = (minute) => {
        if (!('value' in this.props)) {
            this.setState({ minute });
        }
        this.triggerChange({ minute });
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
              onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        return (
            <div>
                <InputNumber
                    min={0}
                    max={100}
                    style={{width: '100px'}}
                    onChange={this.handleDayChange}
                />
                <span>天</span>
                <InputNumber
                    min={0}
                    max={100}
                    style={{width: '100px', marginLeft : '15px'}}
                    onChange={this.handleMinutChange}
                />
                <span>分钟</span>
                <span style={{color : 'red', marginLeft : '15px'}}>注：订单状态变更后的X天Y分钟</span>
            </div>
        );
    }
}

class List extends React.Component<Props, {}> {
    state: any = {
        editing: false,
        sendCoupon: 1,
    };
    private validateFieldsType: Array<string> = ['stragyName', 'time', 'delayTime', 'pushTimes', 'marketingCategory'];
    constructor(props: Props, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onGetRules();
    }

    checkTime = (rule, value, callback) => {
        if (value.day || value.minute) {
            callback();
            return;
        }
        callback('延迟时间不能为空!');
    }

    saveStrategy = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(this.validateFieldsType, (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    addCoupon = () => {
        const { getFieldDecorator } = this.props.form;
        return this.state.sendCoupon === '0' ? (
            this.validateFieldsType.push('coupon'),
            (
                <FormItem {...layout.formItemLayout2} label="优惠券" hasFeedback={false}>
                    {getFieldDecorator('coupon', {
                        rules: [{
                            required: true, message: '策略名称不能为空！',
                        }],
                        initialValue: 0,
                    })(
                        <Input />
                    )}
                </FormItem>
            )
        ) : '';
    }

    marketingCategoryChange = (value) => {
        this.setState({
            sendCoupon: value
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div id="orderStrategy">
                <Layout className="layout">
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">营销管理平台</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>创建策略</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="wrapperContainer">
                            <Form onSubmit={this.saveStrategy}>
                                <FormItem {...layout.formItemLayout} label="策略名称" validateStatus="error" hasFeedback={false}>
                                    {getFieldDecorator('stragyName', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <Input placeholder="请输入策略名称!"/>
                                    )}
                                </FormItem>
                                <FormItem {...layout.formItemLayout} label="生效时间" hasFeedback={false}>
                                    {getFieldDecorator('time', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <RangePicker
                                            showTime={{ format: 'HH:mm:ss' }}
                                            format="YYYY-MM-DD HH:mm"
                                            placeholder={['开始时间', '结束时间']}
                                            onChange={() => console.log(1)}
                                            onOk={() => console.log(1)}
                                        />
                                    )}
                                </FormItem>
                                <StrategyRule 
                                    form={this.props.form} 
                                    onGetService={this.props.onGetService}
                                    onSaveRule={this.props.onSaveRule}
                                    onGetOrderState={this.props.onGetOrderState} 
                                    serviceOptions={this.props.serviceOptions} 
                                    orderState={this.props.orderState}
                                    formState={this.props.formState}
                                    orderSource={this.props.rules[1]}
                                    city={this.props.rules[3]}
                                    serviceSelect={this.props.rules[0].list}
                                />
                                <FormItem {...layout.formItemLayout} label="延迟时间">
                                    {getFieldDecorator('delayTime', {
                                        initialValue: { day: 0, minute: 0 },
                                        rules: [{
                                            required: true, message: '延迟时间不能为空！',
                                            validator: this.checkTime
                                        }],
                                    })(
                                        <DelayTime />
                                    )}
                                </FormItem> 
                                <FormItem {...layout.formItemLayout} label="推送次数" hasFeedback={false}>
                                    {getFieldDecorator('pushTimes', {
                                        rules: [{
                                            required: true, message: '推送次数不能为空！',
                                        }],
                                    })(
                                        <Select
                                            style={{ width: 200 }}
                                            placeholder="请选择推送次数!"
                                            optionFilterProp="children"
                                            onChange={() => { console.log(); }}
                                            onFocus={() => { console.log(); }}
                                            onBlur={() => { console.log(); }}
                                        >
                                            {
                                                new Array(21).fill('a').map((item, i) => {
                                                    return (<Option value={(i).toString()} key={i} >{i === 0 ? '不限制' : i}</Option>);
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <Row className="marketingCategoryRow">
                                    <Col span={3} className="marketingCategoryLabel"><label>营销类别：</label></Col>
                                    <Col span={6}>
                                        <FormItem hasFeedback={false}>
                                            {getFieldDecorator('marketingCategory', {
                                                rules: [{
                                                    required: true, message: '营销类别不能为空',
                                                }],
                                            })(
                                                <Select
                                                    style={{ width: 200 }}
                                                    placeholder="请选择营销类别!"
                                                    optionFilterProp="children"
                                                    onChange={this.marketingCategoryChange}
                                                    onFocus={() => { console.log(); }}
                                                    onBlur={() => { console.log(); }}
                                                >
                                                    {
                                                        ['发券', '用券', '拉新', '商品(不拼团)', '商品(拼团)', '购买会员卡', '评价', '支付', '调查问卷', '活动'].map((item, i) => {
                                                            return (<Option value={(i).toString()} key={i} >{item}</Option>);
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={9}>
                                        {this.addCoupon()}
                                    </Col>
                                </Row>
                                <MarketingModel 
                                    form={this.props.form} 
                                    onSaveModel={this.props.onSaveModel}
                                    formState={this.props.formState}
                                />
                                <FormItem {...layout.formItemLayout} label="责任人" hasFeedback={false}>
                                    {getFieldDecorator('owner', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                        initialValue: 'fanxuehui@58daojia.com',
                                    })(
                                        <Input disabled={true}/>
                                    )}
                                </FormItem>
                                <FormItem {...layout.tailFormItemLayout}>
                                    <Button type="primary" onClick={this.saveStrategy}>创建策略</Button>
                                    <Button onClick={() => console.log(12)} style={{marginLeft: '10px'}}>取消</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </div>
        );
    }
  }

export function mapStateToProps(state: StoreState) {
    return {
        serviceOptions: state.createOrderStrategy.serviceOptions,
        orderState: state.createOrderStrategy.orderState,
        formState: state.createOrderStrategy.formState,
        rules: state.createOrderStrategy.rules,
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ChangeFieldType>) => bindActionCreators(
    {
        onChangeField: actions.changeField,
        onGetOrderState: actions.getOrderState,
        onGetRules: actions.getRules,
        onSaveRule: actions.saveRule,
        onSaveModel: actions.saveModel,
        onGetService: actions.getService
    },
    dispatch
);

const WrappedRegistrationForm = Form.create({
    mapPropsToFields(props: any) {
        return {
            owner: {
                value: props.formState.owner.value,
            },
        };
    },
    onFieldsChange(props: any, fields: any) {
        props.onChangeField(fields);
    }
})(List as any);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm as any));
