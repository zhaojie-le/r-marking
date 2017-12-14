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
    Layout,
    Breadcrumb,
    Button,
    Radio,
    DatePicker
} from 'antd';
import moment from 'moment';
import { MarketingModel } from '../../components';
import './index.scss';

const { Content, Footer } = Layout;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker: any = DatePicker.RangePicker;

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

class CreateImportUserStrategy extends React.Component<Props, {}> {
    state: any = {
        editing: false,
        sendCoupon: 1,
        marketingTypeInt: '',
        showOrderDetailCheck: false
    };
    private validateFieldsType: Array<string> = ['stragyName', 'time', 'delayTime', 'pushTimes', 'marketingCategory', 'marketingModel'];
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

    onMarketingModelChange = (value) => {
        console.log(value);
    }

    onRadioChange = (e) => {
        this.setState({
            marketingTypeInt: e.target.value,
        });
    }

    marketingTypeInt() {
        const { getFieldDecorator } = this.props.form;
        const { marketingTypeInt } = this.state;
        const strategyMarketingType = [
            {
                'name': '发券',
                'id': 1
            },
            {
                'name': '用券',
                'id': 2
            },
            {
                'name': '拉新',
                'id': 3
            },
            {
                'name': '商品[不拼团]',
                'id': 4
            },
            {
                'name': '购买会员卡',
                'id': 5
            },
            {
                'name': '评价',
                'id': 6
            },
            {
                'name': '支付',
                'id': 7
            },
            {
                'name': '调查问卷',
                'id': 8
            },
            {
                'name': '活动',
                'id': 9
            },
            {
                'name': '商品[拼团]',
                'id': 10
            }
        ];

        return (
            <div className="marketingTypeInt">
                <FormItem className="strategyMarketingType" label="营销类别" {...layout.formItemLayoutMarketingModel} >
                    <RadioGroup value={marketingTypeInt} onChange={this.onRadioChange} style={{ width: '100%' }}>
                        {
                            strategyMarketingType.map((item) => {
                                return <Radio value={item.id} key={item.id} >{item.name}</Radio>;
                            })
                        }
                    </RadioGroup>
                </FormItem>
                <FormItem label="优惠券" {...layout.formItemLayout} style={(marketingTypeInt !== 1) ? { display: 'none' } : { display: 'block' }}>
                    {getFieldDecorator('activityId', {
                        rules: [{
                            required: true, message: '优惠券不能为空！',
                        }],
                    })(
                        <Input style={{ width: 80 }} maxLength="30" />
                        )}
                </FormItem>
            </div>
        );
    }
    onStrategyRuleChange = (value) => {
        this.setState({
            showOrderDetailCheck: value.serviceItem[1] === '201' ? true : false
        });
    }

    disabledDate = (current) => {
        if (!current) {
            return current;
        }
        const currentTime = current.valueOf();
        const endTime = moment().add(6, 'M');
        return currentTime && (currentTime < Date.now()) || current && (currentTime > endTime.valueOf());
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { showOrderDetailCheck } = this.state;
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
                                <FormItem {...layout.formItemLayout} label="策略名称" hasFeedback={false}>
                                    {getFieldDecorator('stragyName', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <Input style={{ width: 300 }} placeholder="请输入策略名称!" />
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
                                            disabledDate={this.disabledDate}
                                            placeholder={['开始时间', '结束时间']}
                                        />
                                        )}
                                </FormItem>

                                <FormItem {...layout.formItemLayoutMarketingModel} label="触发规则" hasFeedback={false}>
                                    {getFieldDecorator('strategyRule', {
                                        rules: [{
                                            required: true, message: '触发规则不能为空！',
                                        }],
                                    })(
                                        <div className="strategyRule">
                                            <p>导入用户</p>
                                            <Input style={{ width: 150 }} />
                                            <span>&nbsp;&nbsp;&nbsp;请输入用户批次</span>
                                        </div>

                                        )}
                                </FormItem>
                                {this.marketingTypeInt()}
                                <FormItem {...layout.formItemLayoutMarketingModel} label="营销方式" hasFeedback={false}>
                                    {getFieldDecorator('marketingModel', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                        // initialValue: [
                                        //     { type: '1', value: { type: '1', docs: '111', link: '222' } },
                                        //     { type: '2', value: { type: '2', docs: '111', link: '222', title: '22222' } }
                                        // ]
                                    })(
                                        <MarketingModel
                                            form={this.props.form}
                                            stage={0}
                                            showOrderDetailCheck={showOrderDetailCheck}
                                            onChange={this.onMarketingModelChange}
                                        />
                                        )}
                                </FormItem>
                                <FormItem {...layout.formItemLayout} label="责任人" hasFeedback={false}>
                                    {getFieldDecorator('owner', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                        initialValue: 'fanxuehui@58daojia.com',
                                    })(
                                        <Input disabled={true} />
                                        )}
                                </FormItem>
                                <FormItem {...layout.tailFormItemLayout}>
                                    <Button type="primary" onClick={this.saveStrategy}>创建策略</Button>
                                    <Button onClick={() => history.push('/')} style={{ marginLeft: '10px' }}>取消</Button>
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
})(CreateImportUserStrategy as any);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm as any));
