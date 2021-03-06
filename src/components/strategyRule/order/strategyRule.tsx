import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../../actions';
import { StoreState } from '../../../types/index';
import { bindActionCreators } from 'redux';
import { default as DelayTime } from '../../delayTime';
import { default as ShowRule } from '../showRuleInfo';

import './style.scss';
import {
    Button,
    Cascader,
    Checkbox,
    Select,
    Form,
    Transfer,
    message
} from 'antd';

export interface RuleProps {
    form: any;
    serviceOptions: any[];
    serviceSelect: any[];
    city: { name: string; value: string; type: string; list: any[] };
    orderState: any[];
    formState: any;
    orderSource: { label: string; value: string; }[];
    onGetService: (cp: { lineId: number; cateId: number }) => void;
    onGetWechatPush: (obj: any) => void;
    // onSaveRule: (rjs: string) => void;
    onChange: (value: any) => void;
    onShowOrderDetailCheck: (value: number) => void;
    onGetOrderState: (cp: { serverIds: string }) => void;
}

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
    };

    export const formItemServiceItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 10 }, },
    };

    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
    };
}

function getKeysValues(obj: any, keys: any, key: string = 'value', label: string = 'label'): string {
    return obj.filter((item) => {
        return keys.includes(item[key]);
    }).map((item) => {
        return item[label];
    }).join();
}

class StrategyRule extends React.Component<RuleProps, {}> {
    state: any = {
        editing: false,
        checkedList: [],
        indeterminate: true,
        checkAll: false,
        checkAllCity: false,
        selectedLabel: '',
        rules: []
    };

    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount() {
        console.log('strateRule did mount');
    }

    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }

    checkTime = (rule, value, callback) => {
        if (value.day !== '' && value.minute !== '') {
            callback();
            return;
        }
        callback('延迟时间不能为空!');
    }

    handleClick = (e, label, option) => {
        e.stopPropagation();
    }

    onChange = (value, selectedOptions) => {
        const labelValue = `${selectedOptions[0].label}, ${selectedOptions[1].label}`;

        this.setState({
            cateId: value[1],
            selectedLabel: labelValue
        });
        this.props.onGetService({ lineId: value[0], cateId: value[1] });
    }

    onCheckChange = (checkedList) => {
        const plainOptions = this.props.orderSource;

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
            checkAllCity: false,
        });
        this.props.form.setFieldsValue({
            orderSource: e.target.checked ? this.props.orderSource.map((item) => item.value) : [],
        });
    }
    onCheckAllCity = (e) => {
        console.log('e.target.checked' + e.target.checked);
        if (e.target.checked === true) {
            this.setState({ targetKeys: [], checkAllCity: true });
        } else {
            this.setState({ checkAllCity: false });
        }
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    serviceOption = () => {
        const { getFieldDecorator } = this.props.form;
        const { serviceOptions } = this.props;
        return serviceOptions.length ? (
            <FormItem label=" " {...layout.formItemLayout}>
                {getFieldDecorator('serviceOptions', {
                    rules: [{
                        required: true, message: '订单状态不能为空！',
                    }],
                    initialValue: this.props.formState.serviceOptions.value,
                })(
                    <Transfer
                        dataSource={serviceOptions}
                        showSearch={true}
                        listStyle={{
                            background: '#fff',
                        }}
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetServiceKeys}
                        onChange={this.handleServiceTransferChange}
                        render={item => item.title}
                    />
                )}
            </FormItem>
        ) : '';
    }

    orderState = () => {
        const { getFieldDecorator } = this.props.form;
        const { orderState } = this.props;

        return orderState.length ? (
            <FormItem label="订单状态" {...layout.formItemLayout}>
                {getFieldDecorator('orderState', {
                    rules: [{
                        required: true, message: '订单状态不能为空！',
                    }],
                    initialValue: this.props.formState.orderState.value,
                })(
                    <Select
                        showSearch={true}
                        style={{ width: 200 }}
                        placeholder="请选择订单状态"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {orderState.map((item, i) => (<Option value={item.value} key={i}>{item.label}</Option>))}
                    </Select>
                )}
            </FormItem>
        ) : '';
    }

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }

    handleServiceTransferChange = (targetServiceKeys, direction, moveKeys) => {
        let getKeysValue = getKeysValues(this.props.serviceOptions, targetServiceKeys, 'key', 'val');
        console.log('getKeysValues' + getKeysValues(this.props.serviceOptions, targetServiceKeys, 'key', 'val'));
        this.props.onGetOrderState({ serverIds: getKeysValue });
        this.setState({ targetServiceKeys });
    }

    handleTransferChange = (targetKeys) => {
        this.setState({ targetKeys, checkAllCity: false });
    }

    onSave = () => {
        this.props.form.validateFields(['refer', 'serviceOptions', 'delayTime', 'orderSource', 'orderState', 'pushTimes'], (err, values) => {
            if (!err) {
                // onShowOrderDetailCheck 1订单详情，2订单评价 0不展示
                console.log('this.state.targetKeys ====' + this.state.targetKeys);
                console.log(typeof this.state.targetKeys);
                console.log(this.state.targetKeys[0]);
                if (((this.state.targetKeys[0] === undefined && this.state.checkAllCity === false) || this.state.targetKeys === undefined) && this.state.checkAllCity === false) {
                    message.error('请填写城市');
                    return;
                }
                this.props.onGetWechatPush({
                    lineid: values.refer[0],
                    refer: values.serviceOptions[0],
                    orderStatus: values.orderState,
                });
                let getKeysValue = getKeysValues(this.props.serviceOptions, values.serviceOptions, 'key', 'val');
                values.refer = getKeysValue.split(',');
                console.log('refer========' + values.refer);
                console.log('VALUESSSSSSS====' + JSON.stringify(values));
                if (this.state.targetKeys !== undefined && this.state.checkAllCity === false) {
                    values.city = this.state.targetKeys;
                }
                values.orderState = values.orderState.split(',');
                this.computeShowData(values);
                if (this.state.checkAllCity) {
                    values.city = ['-999'];
                }
                this.props.onChange(values);
                this.props.onShowOrderDetailCheck((values.refer[1] === '201' ? 1 : values.refer[1] === '212' || values.refer[1] === '205' ? 2 : 0));
                // this.props.onSaveRule(JSON.stringify(values));
            }
        });
    }

    computeShowData = (values: any) => {
        let rules: { label: string; value: string }[] = [];
        for (let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';

            switch (item) {
                case 'orderState':
                    label = '订单状态';
                    value = getKeysValues(this.props.orderState, values.orderState, 'value', 'label');
                    break;

                case 'serviceOptions':
                    label = '业务线、品类';
                    value = this.state.selectedLabel;
                    break;
                case 'refer':
                    label = '服务项';
                    value = getKeysValues(this.props.serviceOptions, values.serviceOptions, 'key', 'title');
                    break;
                case 'orderSource':
                    label = '订单来源';
                    value = getKeysValues(this.props.orderSource, values.orderSource, 'value', 'label');
                    break;
                case 'city':
                    label = '城市';
                    value = getKeysValues(this.props.city.list, values.city.map((one) => `${parseInt(one, 10)}`), 'value', 'label');
                    break;
                case 'delayTime':
                    label = '延迟时间';
                    value = `${values.delayTime.day}天${values.delayTime.minute}分`;
                    break;
                case 'pushTimes':
                    label = '推送次数';
                    value = values.pushTimes === '0' ? '不限制' : `${values.pushTimes}次`;
                    break;
                default:
                    break;
            }
            if (label !== '') {
                rules.push({
                    label: label,
                    value: value
                });
            }
        }
        this.setState({
            rules: rules
        });
        this.onEdit(false);
    }

    render() {
        let triggerRuleTpl: React.ReactNode = {};
        let btnStyle = {};
        let wrapperStyle: any = {};
        const rule = [...this.state.rules];
        const { getFieldDecorator } = this.props.form;
        const cities = this.props.city.list.map((item, index) => {
            return {
                title: item.label,
                value: item.value,
                key: `${item.value}`
            };
        });
        const plainOptions = this.props.orderSource;
        const options = this.props.serviceSelect;
        // if (this.props.serviceOptions.length) {
        //     rule.push({
        //         label: '品类',
        //         value: this.state.selectedLabel
        //     });
        // }

        if (this.state.checkAllCity) {
            rule.push({
                label: '城市',
                value: '全国'
            });
        }
        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <FormItem label="服务项" {...layout.formItemServiceItemLayout}>
                        {getFieldDecorator('refer', {
                            rules: [{
                                required: true, message: '策略名称不能为空！',
                            }],
                            initialValue: this.props.formState.refer.value,
                        })(
                            <Cascader placeholder="请输入服务项！" options={options} onChange={this.onChange} />
                        )}
                    </FormItem>
                    {this.serviceOption()}
                    <FormItem label="订单来源" {...layout.formItemLayout}>
                        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                全部
                            </Checkbox>
                            {getFieldDecorator('orderSource', {
                                initialValue: this.props.formState.orderSource.value,
                                rules: [{
                                    required: true, message: '策略名称不能为空！',
                                }],
                            })(
                                <CheckboxGroup options={plainOptions} onChange={this.onCheckChange} />
                            )}
                        </div>
                    </FormItem>
                    {this.orderState()}
                    <div className="city">
                        <FormItem label="城市" {...layout.formItemLayout}>
                            <Checkbox
                                // indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllCity}
                                checked={this.state.checkAllCity}
                                value={'-999'}
                            >
                                全国
                            </Checkbox>
                            {getFieldDecorator('city', {
                                rules: [{
                                    required: false, message: '请选择城市！',
                                }],
                                initialValue: this.props.formState.city.value,
                            })(

                                <Transfer
                                    dataSource={cities}
                                    showSearch={true}
                                    listStyle={{
                                        background: '#fff',
                                    }}
                                    filterOption={this.filterOption}
                                    targetKeys={this.state.targetKeys}
                                    onChange={this.handleTransferChange}
                                    render={item => item.title}
                                />
                            )}

                        </FormItem>
                    </div>
                    <FormItem {...layout.formItemLayout} label="延迟时间">
                        {
                            getFieldDecorator('delayTime', {
                                initialValue: this.props.formState.delayTime.value,
                                rules: [{
                                    required: true, message: '延迟时间不能为空！',
                                    validator: this.checkTime
                                }],
                            })(
                                <DelayTime />
                            )
                        }
                    </FormItem>
                    <FormItem {...layout.formItemLayout} label="推送次数" hasFeedback={false}>
                        {getFieldDecorator('pushTimes', {
                            initialValue: this.props.formState.pushTimes.value,
                            rules: [{
                                required: true, message: '推送次数不能为空！',

                            }],
                        })(
                            <Select
                                style={{ width: 200 }}
                                placeholder="请选择推送次数!"
                                optionFilterProp="children"
                            >
                                {
                                    new Array(21).fill('a').map((item, i) => {
                                        return (<Option value={(i).toString()} key={i} >{i === 0 ? '不限制' : i}</Option>);
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...layout.tailFormItemLayout}>
                        <Button type="primary" onClick={this.onSave}>保存</Button>
                        <Button onClick={() => this.onEdit(false)} style={{ marginLeft: '10px' }}>取消</Button>
                    </FormItem>
                </section>
            );
            btnStyle = {
                display: 'none'
            };
        } else {
            wrapperStyle.background = '#fff';
            wrapperStyle.border = 'none';
            triggerRuleTpl = (
                <ShowRule rules={rule} />
            );
        }
        return (
            <div className="wrapperRules" style={wrapperStyle}>
                <div className="triggerRules">
                    <div className="ruleContent">
                        {triggerRuleTpl}
                    </div>
                    <div>
                        <Button onClick={() => this.onEdit(true)} style={btnStyle}>编辑</Button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        serviceOptions: state.createOrderStrategy.serviceOptions,
        orderState: state.createOrderStrategy.orderState,
        orderSource: state.createOrderStrategy.rules.settings.orderSource ? state.createOrderStrategy.rules.settings.orderSource.list : [],
        city: state.createOrderStrategy.rules.settings.city ? state.createOrderStrategy.rules.settings.city : { list: [] },
        serviceSelect: state.createOrderStrategy.rules.settings.refer ? state.createOrderStrategy.rules.settings.refer.list : [],
        formState: state.createOrderStrategy.formState
    };
}

const mapDispatchToProps = (dispatch: Dispatch<actions.ChangeFieldType>) => bindActionCreators(
    {
        onGetOrderState: actions.getOrderState,
        // onSaveRule: actions.saveRule,
        onGetService: actions.getService,
        onGetWechatPush: actions.getWechatPush,
        onShowOrderDetailCheck: actions.setShowOrderDetailCheck,
    },
    dispatch
);

export default connect<any, any, { form: any, onChange: (value: any) => void }>(mapStateToProps, mapDispatchToProps)(StrategyRule as any);
