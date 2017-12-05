import * as React from 'react';
import './style.scss';

export interface RuleProps {
    form: any;
    serviceOptions: any[];
    serviceSelect: any[];
    city: {name: string; value: string; type: string; list: any[]};
    orderState: any[];
    formState: any;
    orderSource: { label: string; value: string; }[];
    onGetService: (cp: {lineId: number; cateId: number}) => void;
    onSaveRule: (rjs: string) => void;
    onChange: (value: any) => void;
    onGetOrderState: (cp: {serverIds: string; cateId: number}) => void;
}

import {
    Button,
    Cascader,
    Checkbox,
    Select,
    Form,
    Transfer,
} from 'antd';

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

function getKeysValues(obj: any, keys: any, key: string = 'value', label: string = 'name'): string {
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

    handleClick = (e, label, option) => {
        e.stopPropagation();
    }

    onChange = (value, selectedOptions) => {
        const labelValue = `${selectedOptions[0].label}, ${selectedOptions[1].label}`;
        this.setState({
            cateId: value[1],
            selectedLabel: labelValue
        });
        this.props.onGetService({lineId: value[0], cateId: value[1]});
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
        });
        this.props.form.setFieldsValue({
            orderSource: e.target.checked ? this.props.orderSource.map((item) => item.value) : [],
        });
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

    handleServiceTransferChange = (targetServiceKeys) => {
        this.props.onGetOrderState({serverIds: targetServiceKeys.join(), cateId: this.state.cateId});
        this.setState({ targetServiceKeys });
    }

    handleTransferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    onSave = () => {
        this.props.form.validateFields(['serviceItem', 'serviceOptions', 'orderSource', 'orderState', 'city'], (err, values) => {
            if (!err) {
                this.computeShowData(values);
                this.props.onChange(values);
                this.props.onSaveRule(JSON.stringify(values));
            }
        });
    }

    computeShowData = (values: any) => {
        let labelSet: any = {};
        for ( let item of Object.keys(values)) {
            switch (item) {
                case 'orderState':
                    labelSet.orderStateLabel = getKeysValues(this.props.orderState, values.orderState, 'value', 'label');
                    break;
                case 'serviceOptions':
                    labelSet.serviceOptionLabel = getKeysValues(this.props.serviceOptions, values.serviceOptions, 'key', 'title');
                    break;
                case 'orderSource':
                    labelSet.orderSourceLabel = getKeysValues(this.props.orderSource, values.orderSource, 'value', 'label');
                    break;
                case 'city':
                    labelSet.cityLabel = getKeysValues(this.props.city.list, values.city.map((one) => `${parseInt(one, 10) + 1}`), 'value', 'label');
                    break;
                default:
                    break;
            }
        }
        this.setState(labelSet);
        this.onEdit(false);
    }

    render() {
        let triggerRuleTpl: React.ReactNode = {};
        let btnStyle = {};
        let wrapperStyle: any = {};
        const { orderStateLabel = '无', serviceOptionLabel = '无', orderSourceLabel = '无', cityLabel = '无', selectedLabel = '无' } = this.state;
        const { getFieldDecorator } = this.props.form;
        const cities = this.props.city.list.map((item, index) => {
            return {
                title: item.label,
                value: item.value,
                key: `${index}`
            };
        });
        const plainOptions = this.props.orderSource;
        const options = this.props.serviceSelect;
        
        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <FormItem label="服务项" {...layout.formItemServiceItemLayout}>
                        {getFieldDecorator('serviceItem', {
                            rules: [{
                                required: true, message: '策略名称不能为空！',
                            }],
                            initialValue: this.props.formState.serviceItem.value,
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
                    <FormItem label="城市" {...layout.formItemLayout}>
                        {getFieldDecorator('city', {
                            rules: [{
                                required: true, message: '请选择城市！',
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
                    <FormItem {...layout.tailFormItemLayout}>
                        <Button type="primary" onClick={this.onSave}>保存</Button>
                        <Button onClick={() => this.onEdit(false)} style={{marginLeft: '10px'}}>取消</Button>
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
                <section className="showInfo">
                    <p><label>规则名称:</label><span>订单事件</span></p>
                    <p><label>服务项:</label><span>{selectedLabel}</span></p>
                    <p><label>服务项具体选项:</label><span>{serviceOptionLabel}</span></p>
                    <p><label>订单来源:</label><span>{orderSourceLabel}</span></p>
                    <p><label>订单状态:</label><span>{orderStateLabel}</span></p>
                    <p><label>城市:</label><span>{cityLabel}</span></p>
                </section>
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

export default StrategyRule;