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
    Select,
    DatePicker
} from 'antd';
import moment from 'moment';
import {
    RuleCreater,
    StrategyCreater,
    TreeSelect,
    MarketingModelAdd,
    LoadElement,
    PageHanger
    // LoadElement,
    // MarketingModelAdd
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
    option: any;
    strategyType: any;
    ruleHadBack: boolean;
    onGetService: () => void;
    onGetRules: (type: number) => void;
    onSaveRule: (rjs: any) => void;
    onResetWeChatPush: () => void;
    onSaveModel: (modelData: string) => void;
    onGetOrderState: () => void;
    onGetTreeNode: (id: number) => void;
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

    export const formItemLayout1 = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 21 },
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
const userConditions: any = ['2', '4', '5', '6'];
let uuid: number = 0;
let uuidSr: number = 0;
class CreateOrderStrategy extends React.Component<Props, {}> {
    state: any = {
        editing: false,
        sendCoupon: 1,
        eventType: 0,
        disabledTrggerCondition: false
    };
    private preEventType: number;
    private preSrType: number;
    private marketingModel: any = MarketingModelAdd;
    private stType: string;
    private usType: string;
    private saveParams: any = {};
    private timeMerge: any = {};
    private validateFieldsType: Array<string> = ['strategyName', 'time', 'marketingCategory', 'strategyRule0', 'marketingModel0', 'marketingType'];
    constructor(props: Props, context: any) {
        super(props, context);
    }

    componentDidMount() {
       // this.props.onGetRules(1);
       this.props.onGetTreeNode(1);
    }

    validateTrgger = (): boolean | undefined => {
        const { getFieldValue } = this.props.form;
        const triggerConditionValue = getFieldValue('triggerCondition');
        const triggerEventValue = getFieldValue('triggerEvent');
        if  ((!triggerConditionValue || triggerConditionValue === '0') && (!triggerEventValue || triggerEventValue === '0')) {
            this.setState({
                validateStatus: 'error'
            });
            return true;
        }
        this.setState({
            validateStatus: 'success'
        });
        return;
    }

    saveStrategy = (e) => {
        e.preventDefault();
        if (this.validateTrgger()) {
            return;
        }
        this.props.form.validateFieldsAndScroll(this.validateFieldsType, (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.mergeParmas(values);
                this.props.onSaveRule(this.saveParams);
            } else {
                console.log('allValues', values);
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
            if (item0.startsWith('strategyRule')) {
                // 触发规则
                newPar.triggerRule = item1;
            } else if (item0.startsWith('marketingModel')) {
                // 营销方式
                newPar.actionParam = item1;
                newPar.actionExpression = item1.keys.toString();
            } else if (item0.startsWith('strategyName')) {
                // 营销方式
                newPar.strategyName = item1;
            } else if (item0.startsWith('marketingType')) {
                newPar.marketingType = item1.marketingType;
                newPar.activityId = item1.activityId;
            }
        }
        newPar.actionParam = newPar.actionParam ? this.actionParamsMap(newPar.actionParam) : null;
        console.log('newPar', newPar);
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
    }
    chartNumberMap = (objItem) => {
        let newContent: any = {};
        newContent.firstData = objItem.first ? objItem.first : '';
        newContent.remarkData = objItem.remark ? objItem.remark : '';
        if (objItem.linkInput) {
            // 默认订单详情
            newContent.gotoOrderPage = 1;
        } else {
            // 输入的跳转链接
            newContent.openUrl = objItem.link;
        }
    }

    onTimeChange = (value, dateString) => {
        // value 未转换格式；dateString 转换后格式
        let dataArray = dateString;
        if (dataArray.length > 0) {
           this.timeMerge.effectiveTime = dataArray[0];
           this.timeMerge.invalidTime = dataArray[1];
        }
    }

    onMarketingModelChange = (value) => {
        console.log(value);
    }
    // 触发规则
    onStrategyRuleChange = (value) => {
        console.log(value);
    }
    // 营销类别
    onMarketingTypeChange = (value) => {
        console.log(value);
    }

    checkCondition = (strategyType: string | null, userType: string | null) => {
        this.stType = strategyType || this.stType;
        this.usType = userType || this.usType;
        if ( (!this.stType || this.stType  === '0') && (!this.usType || this.usType === '0') ) {
            this.setState({
                validateStatus: 'error'
            });
            return true;
        }
        this.setState({
            validateStatus: 'success'
        });
        return false;
    }

    onSelectEvent = (value) => {
        if ( this.checkCondition(value, null) ) {
            return;
        }
        const disabledTrggerCondition = userConditions.includes(value) ? true : false;
        let NumValue = parseInt(value, 10);
        if (NumValue === 1 || NumValue === 3 || NumValue === 7) {
            this.props.onGetRules(NumValue);
        }
        // this.props.onGetRules(parseInt(value, 10));
        if ( disabledTrggerCondition ) {
            this.props.form.setFieldsValue({
                triggerCondition: '0',
            });
            this.setState({
                userSelected: '0'
            });
            if ( this.validateFieldsType.indexOf('treeSelect') >= 0 ) {
                this.validateFieldsType.splice(this.validateFieldsType.indexOf('treeSelect'), 1);
            }
        }
        this.changeMarketingType(NumValue);
        this.changeStrategyRule(NumValue);
        this.setState({
            disabledTrggerCondition: disabledTrggerCondition,
            eventType: parseInt(value, 10)
        });
    }

    generateTriggerEvent = () => {
        const { getFieldDecorator } = this.props.form;
        const { eventType } = this.state;

        if (eventType !== 0) {
            return (
                <FormItem {...layout.formItemLayoutMarketingModel} label="触发规则" hasFeedback={false}>
                    {
                        getFieldDecorator(`strategyRule${uuidSr}`, {
                            rules: [{
                                required: true, message: '规则不能为空！',
                            }]
                        })(
                            <RuleCreater onChange={this.onStrategyRuleChange} form={this.props.form} strategyType={eventType}/>
                        )}
                </FormItem>
            );
        } else {
            return null;
        }
    }

    strategyTriggerEvent = () => {
        const { eventType, userSelected } = this.state;
        const { getFieldDecorator } = this.props.form;

        if (eventType !== 0 || userSelected !== 0) {
            return (
                <FormItem {...layout.formItemLayoutMarketingModel} label="营销类别" hasFeedback={false}>
                    {
                        getFieldDecorator('marketingType', {
                            rules: [{
                                required: true, message: '营销类别不能为空！',
                            }],
                        })(
                            <StrategyCreater onChange={this.onMarketingTypeChange} form={this.props.form} strategyType={eventType}/>
                        )
                    }
                </FormItem>
            );
        } else {
            return null;
        }
    }

    disabledDate = (current) => {
        if ( !current ) {
            return current;
        }
        const currentTime = current.valueOf();
        const endTime = moment().add(6, 'M');
        return currentTime && (currentTime < Date.now()) || current && (currentTime > endTime.valueOf());
    }

    onUserBeSelect = (value) => {

        let treeSelect = '0';
        if (value === '1') {
            treeSelect = '1';
            this.validateFieldsType.push('treeSelect');
        } else {
            if ( this.validateFieldsType.indexOf('treeSelect') >= 0 ) {
                this.validateFieldsType.splice(this.validateFieldsType.indexOf('treeSelect'), 1);
            }
        }

        this.setState({
            userSelected: treeSelect
        });

        if ( this.checkCondition(null, value) ) {
            return;
        }
    }

    onTreeSelectChange = (value) => {
        console.log(value);
    }

    generatorTreeSelect = () => {
        const { userSelected } = this.state;
        const { getFieldDecorator } = this.props.form;

        if (userSelected === '1') {
            return (
                <FormItem {...layout.formItemLayout1} label="用户条件" hasFeedback={false}>
                {
                    getFieldDecorator('treeSelect', {
                        rules: [{
                            required: true, message: '用户条件不能为空！',
                        }],
                    })(
                        <TreeSelect onChange={this.onTreeSelectChange}/>
                    )
                }
                </FormItem>
            );
        }
        return null;
    }

    changeMarketingType = (eventType) => {
        if (
            (([1, 2, 4, 5, 6] as any).includes(eventType) && this.preEventType === 1 )
            || eventType === this.preEventType) {
            return;
        }
        this.validateFieldsType.splice(this.validateFieldsType.indexOf(`marketingModel${uuid}`), 1);
        // this.validateFieldsType.splice(this.validateFieldsType.indexOf(`actionParam`), 1);
        uuid++;
        // this.validateFieldsType.push(`actionParam`);
        this.validateFieldsType.push(`marketingModel${uuid}`);
        switch (eventType) {
            case 3:
                this.marketingModel = LoadElement;
                this.preEventType = 3;
                break;
            case 7:
                this.marketingModel = PageHanger;
                this.preEventType = 7;
                break;
            default:
                this.marketingModel = MarketingModelAdd;
                this.preEventType = 1;
                break;
        }
    }

    changeStrategyRule = (eventType) => {
        if (eventType === this.preSrType) {
            return;
        }
        this.validateFieldsType.splice(this.validateFieldsType.indexOf(`strategyRule${uuidSr}`), 1);
        // this.validateFieldsType.splice(this.validateFieldsType.indexOf(`triggerRule`), 1);
        uuidSr++;
        this.validateFieldsType.push(`strategyRule${uuidSr}`);
        // this.validateFieldsType.push(`triggerRule`);
        this.preSrType = eventType;
        this.props.onResetWeChatPush();
    }

    generatorMarketingModel = () => {
        const { getFieldDecorator } = this.props.form;
        const { eventType, userSelected } = this.state;
        let MarketingModel: any = this.marketingModel;
        if ( eventType !== 0  || userSelected !== 0 ) {
            return (
                <FormItem {...layout.formItemLayoutMarketingModel} label="营销方式" hasFeedback={false}>
                    {
                        getFieldDecorator(`marketingModel${uuid}`, {
                            rules: [{
                                required: true, message: '营销方式不能为空！',
                            }],
                        })(
                            <MarketingModel
                                form={this.props.form}
                                stage={false}
                                onChange={this.onMarketingModelChange}
                            />
                        )}
                </FormItem>
            );
        } else {
            return null;
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { history }: any = this.props;
        const { disabledTrggerCondition, validateStatus } = this.state;

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
                                    {
                                        getFieldDecorator('strategyName', {
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
                                                required: true, message: '时间不能为空！',
                                            }],
                                        })(
                                            <RangePicker
                                                showTime={{ format: 'HH:mm:ss' }}
                                                format="YYYY-MM-DD HH:mm"
                                                disabledDate={this.disabledDate}
                                                placeholder={['开始时间', '结束时间']}
                                                onChange={this.onTimeChange}
                                            />
                                        )
                                    }
                                </FormItem>

                                <FormItem {...layout.formItemLayout} label="触发事件" validateStatus={validateStatus} hasFeedback={true} help="触发事件和触发条件必选一项!">
                                    {
                                        getFieldDecorator('triggerEvent', {
                                            rules: [{
                                                required: true, message: '请输入触发事件！',
                                            }],
                                        })(
                                            <Select onChange={this.onSelectEvent}>
                                                <Option value="0">请选择</Option>
                                                <Option value="1">订单策略</Option>
                                                <Option value="2">导入用户</Option>
                                                <Option value="3">支付预约页面营销</Option>
                                                <Option value="4">外推消息</Option>
                                                <Option value="5">全部用户</Option>
                                                <Option value="6">储值返券</Option>
                                                <Option value="7">页面挂件</Option>
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem {...layout.formItemLayout} label="触发条件" validateStatus={validateStatus} hasFeedback={true} help="触发事件和触发条件必选一项!">
                                    {
                                        getFieldDecorator('triggerCondition', {
                                            rules: [{
                                                required: true, message: '触发条件不能为空！',
                                            }],
                                        })(
                                            <Select onChange={this.onUserBeSelect} disabled={disabledTrggerCondition}>
                                                <Option value="0">请选择</Option>
                                                <Option value="1">用户条件</Option>
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                {this.generatorTreeSelect()}
                                {this.generateTriggerEvent()}
                                {this.strategyTriggerEvent()}
                                {this.generatorMarketingModel()}
                                <FormItem {...layout.formItemLayout} label="责任人" hasFeedback={false}>
                                    {
                                        getFieldDecorator('owner', {
                                            rules: [{
                                                required: true, message: '责任人不能为空！',
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
        formState: state.createOrderStrategy.formState,
        option: state.createOrderStrategy.weChatPush,
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ChangeFieldType>) => bindActionCreators(
    {
        onChangeField: actions.changeField,
        onGetRules: actions.getRules,
        onGetTreeNode: actions.tagNodeTree,
        onSaveRule: actions.saveRule,
        onResetWeChatPush: actions.resetWeChatPush
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
