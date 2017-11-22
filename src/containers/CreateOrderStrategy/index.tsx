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
    form: any;
    onGetService: () => void;
    onGetRules: () => void;
    onGetOrderState: () => void;
}

namespace laout {
    export const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 5 },
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

class List extends React.Component<Props, object> {
    state = {
        editing: false
    };
    constructor(props: Props, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onGetRules();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
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
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem {...laout.formItemLayout} label="策略名称" hasFeedback={false}>
                                    {getFieldDecorator('stragyName', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <Input placeholder="请输入策略名称!"/>
                                    )}
                                </FormItem>
                                <FormItem {...laout.formItemLayout} label="生效时间" hasFeedback={false}>
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
                                    onGetOrderState={this.props.onGetOrderState} 
                                    serviceOptions={this.props.serviceOptions} 
                                    orderState={this.props.orderState}
                                    orderSource={this.props.rules[1]}
                                    city={this.props.rules[3]}
                                    serviceSelect={this.props.rules[0].list}
                                />
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
                                <FormItem {...laout.formItemLayout} label="推送次数" hasFeedback={false}>
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
                                                    onChange={() => { console.log(); }}
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
                                        <FormItem {...laout.formItemLayout2} label="优惠券" hasFeedback={false}>
                                            {getFieldDecorator('coupon', {
                                                rules: [{
                                                    required: true, message: '策略名称不能为空！',
                                                }],
                                                initialValue: 0,
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <MarketingModel form={this.props.form} />
                                <FormItem {...laout.formItemLayout} label="责任人" hasFeedback={false}>
                                    {getFieldDecorator('owner', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                        initialValue: 'fanxuehui@58daojia.com',
                                    })(
                                        <Input disabled={true}/>
                                    )}
                                </FormItem>
                                <FormItem {...laout.tailFormItemLayout}>
                                    <Button type="primary" onClick={() => console.log(22)}>创建策略</Button>
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
        enthusiasmLevel: state.list.enthusiasmLevel,
        name: state.list.languageName,
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
