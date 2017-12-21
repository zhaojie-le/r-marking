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
    DatePicker
} from 'antd';
import moment from 'moment';
import {
    RuleCreater,
    MarketingModelAdd
} from '../../components';
import './index.scss';

const {Content, Footer } = Layout;
const FormItem = Form.Item;
const RangePicker: any = DatePicker.RangePicker;
const Option = Select.Option;

export interface Props {
    serviceOptions: any[];
    orderState: any[];
    rules: {strategyType: number; setting: any; };
    formState: any;
    form: any;
    onGetService: () => void;
    onGetRules: () => void;
    onSaveRule: () => void;
    onSaveModel: (modelData: string) => void;
    onGetOrderState: () => void;
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

    export const formItemLayoutMarketingModel = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 21 },
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

class CreateOrderStrategy extends React.Component<Props, {}> {
    state: any = {
        editing: false,
        sendCoupon: 1
    };
    private validateFieldsType: Array<string> = ['stragyName', 'time', 'pushTimes', 'strategyRule', 'marketingCategory', 'marketingModel'];
    constructor(props: Props, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onGetRules();
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

    onMarketingModelChange = (value) => {
        console.log(value);
    }

    onStrategyRuleChange = (value) => {
        console.log(value);
    }

    disabledDate = (current) => {
        if ( !current ) {
            return current;
        }
        const currentTime = current.valueOf();
        const endTime = moment().add(6, 'M');
        return currentTime && (currentTime < Date.now()) || current && (currentTime > endTime.valueOf());
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { history }: any = this.props;

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
                                    {
                                        getFieldDecorator('stragyName', {
                                            rules: [{
                                                required: true, message: '策略名称不能为空！',
                                            }],
                                        })(
                                            <Input placeholder="请输入策略名称!"/>
                                        )
                                    }
                                </FormItem>
                                <FormItem {...layout.formItemLayout} label="生效时间" hasFeedback={false}>
                                    {
                                        getFieldDecorator('time', {
                                            rules: [{
                                                required: true, message: '策略名称不能为空！',
                                            }],
                                        })(
                                            <RangePicker
                                                showTime={{ format: 'HH:mm:ss' }}
                                                format="YYYY-MM-DD HH:mm"
                                                disabledDate={this.disabledDate}
                                                placeholder={['开始时间', '结束时间']}
                                            />
                                        )
                                    }
                                </FormItem>

                                <FormItem {...layout.formItemLayoutMarketingModel} label="触发规则" hasFeedback={false}>
                                    {
                                        getFieldDecorator('strategyRule', {
                                            rules: [{
                                                required: true, message: '规则不能为空！',
                                            }],
                                            initialValue: [
                                                {type: '1', value: {type: '1', docs: '111', link: '222'}}
                                            ]
                                        })(
                                            <RuleCreater onChange={this.onStrategyRuleChange} form={this.props.form} strategyType={7}/>
                                        )
                                    }
                                </FormItem>
                                <Row className="marketingCategoryRow">
                                    <Col span={3} className="marketingCategoryLabel"><label>营销类别：</label></Col>
                                    <Col span={6}>
                                        <FormItem hasFeedback={false}>
                                            {
                                                getFieldDecorator('marketingCategory', {
                                                    rules: [{
                                                        required: true, message: '营销类别不能为空',
                                                    }],
                                                })(
                                                    <Select
                                                        style={{ width: 200 }}
                                                        placeholder="请选择营销类别!"
                                                        optionFilterProp="children"
                                                        onChange={this.marketingCategoryChange}
                                                    >
                                                        {
                                                            ['发券', '用券', '拉新', '商品(不拼团)', '商品(拼团)', '购买会员卡', '评价', '支付', '调查问卷', '活动'].map((item, i) => {
                                                                return (<Option value={(i).toString()} key={i} >{item}</Option>);
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={9}>
                                        {this.addCoupon()}
                                    </Col>
                                </Row>

                                <FormItem {...layout.formItemLayoutMarketingModel} label="营销方式" hasFeedback={false}>
                                    {
                                        getFieldDecorator('marketingModel', {
                                            rules: [{
                                                required: true, message: '策略名称不能为空！',
                                            }],
                                            initialValue: [
                                                {type: '1', value: {type: '1', docs: '111', link: '222'}},
                                                {type: '2', value: {type: '2', docs: '111', link: '222', title: '22222'}}
                                            ]
                                        })(
                                            <MarketingModelAdd
                                                form={this.props.form}
                                                stage={0}
                                                onChange={this.onMarketingModelChange}
                                            />
                                        )
                                    }
                                </FormItem>
                                <FormItem {...layout.formItemLayout} label="责任人" hasFeedback={false}>
                                    {
                                        getFieldDecorator('owner', {
                                            rules: [{
                                                required: true, message: '策略名称不能为空！',
                                            }],
                                            initialValue: 'fanxuehui@58daojia.com',
                                        })(
                                            <Input disabled={true}/>
                                        )
                                    }
                                </FormItem>
                                <FormItem {...layout.tailFormItemLayout}>
                                    <Button type="primary" onClick={this.saveStrategy}>创建策略</Button>
                                    <Button onClick={() => history.push('/')} style={{marginLeft: '10px'}}>取消</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        北京58到家信息技术有限公司 ©2017 营销系统
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
})(CreateOrderStrategy as any);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm as any));
