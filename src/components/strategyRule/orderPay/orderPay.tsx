import * as React from 'react';
import '../pendant/style.scss';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../../actions';
import { StoreState } from '../../../types/index';
import { bindActionCreators } from 'redux';
import { Form, Checkbox, Button, Cascader, Transfer } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
export interface RuleProps {
    form: any;
    rulesD: {};
    serviceList: any[];
    onChange: (value: any) => void;
    plainOptions: any;
    formState: any;
    serviceOptions: any[];
    onGetService: (cp: { lineId: number; cateId: number }) => void;
    onGetOrderState: (cp: { serverIds: string; cateId: number }) => void;
}
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, },
    };
    export const formItemLayout1 = {
        labelCol: { xs: { span: 24 }, sm: { span: 9 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 13 }, },
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
class OrderPayRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        editing: false,
        checkedList: [],
        indeterminate: true,
        checkAll: false,
        rules: [],
        serviceOptions: [],
        selectedLabel: ''
    };
    onCheckAllChange = (e) => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.form.setFieldsValue({
            orderSource: e.target.checked ? this.props.plainOptions.map((item) => item.value) : [],
        });
    }
    onCheckChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.props.plainOptions.length),
            checkAll: checkedList.length === this.props.plainOptions.length,
        });
    }
    handleServiceTransferChange = (targetServiceKeys) => {
        // this.props.onGetOrderState({ serverIds: targetServiceKeys.join(), cateId: this.state.cateId });
        this.setState({ targetServiceKeys });
    }

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing,
            selectedLabel: '',
        });
    }
    serviceOption = () => {
        const { getFieldDecorator } = this.props.form;
        const { serviceOptions } = this.props;
        const { selectedLabel } = this.state;
        return selectedLabel !== '' ? (
            <FormItem label=" " {...layout.formItemLayout}>
                {getFieldDecorator('serviceOptions', {
                    rules: [{
                        required: true, message: '订单状态不能为空！',
                    }],
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
    onSave = () => {
        this.props.form.validateFields(['refer', 'orderSource'], (err, values) => {
            if (!err) {
                this.computeShowData(values);
                this.props.onChange(values);
            }
        });
    }
    onServiceChange = (value, selectedOptions) => {
        console.log('service', `${value}`);
        const labelValue = `${selectedOptions[0].label}, ${selectedOptions[1].label}`;
        this.setState({
            cateId: value[1],
            selectedLabel: labelValue,
        });
        this.props.onGetService({ lineId: value[0], cateId: value[1] });
    }

    computeShowData = (values: any) => {
        let rules: { label: string; value: string }[] = [];
        for (let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';
            switch (item) {
                case 'refer':
                    label = '服务项';
                    value = this.state.selectedLabel;
                    break;
                // case 'serviceOptions':
                //     label = '品类';
                //     value = getKeysValues(this.props.serviceOptions, values.serviceOptions, 'key', 'title');
                //     break;
                case 'orderSource':
                    label = '页面渠道';
                    value = getKeysValues(this.props.plainOptions, values.orderSource, 'value', 'label');
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
        let wrapperStyle: any = {};
        let btnStyle: any = {};
        const { plainOptions, serviceList } = this.props;
        const rules = [...this.state.rules];
        const { getFieldDecorator } = this.props.form;
        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <FormItem label="服务项" {...layout.formItemLayout}>
                        {getFieldDecorator('refer', {
                            rules: [{
                                required: true, message: '服务项不能为空！',
                            }],
                            initialValue: this.props.formState.serviceItem.value,
                        })(
                            <Cascader placeholder="请输入服务项！" options={serviceList} onChange={this.onServiceChange} />
                            )}
                    </FormItem>
                    {this.serviceOption()}
                    <FormItem label="页面渠道" {...layout.formItemLayout}>
                        {getFieldDecorator('pageWay', {
                            rules: [{
                                required: true, message: '请选择页面渠道！',
                            }],
                        })(
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                >
                                    全部
                                </Checkbox>
                                {getFieldDecorator('orderSource', {
                                    rules: [{
                                        required: true, message: '页面渠道不能为空！',
                                    }],
                                })(
                                    <CheckboxGroup options={plainOptions} onChange={this.onCheckChange} />
                                    )}
                            </div>
                            )}
                    </FormItem>
                    <FormItem {...layout.tailFormItemLayout}>
                        <Button type="primary" onClick={this.onSave}>保存</Button>
                        <Button onClick={() => this.onEdit(false)} style={{ marginLeft: '10px' }}>取消</Button>
                    </FormItem>
                    {/* </div> */}
                </section>
            );
            btnStyle = {
                display: 'none'
            };
        } else {
            wrapperStyle.background = '#fff';
            wrapperStyle.border = 'none';
            triggerRuleTpl = (
                <ShowRule rules={rules} />
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
        formState: state.createOrderStrategy.formState,
        serviceOptions: state.createOrderStrategy.serviceOptions,
        rulesD: state.createOrderStrategy.rules,
        serviceList: state.createOrderStrategy.rules.settings.refer ? state.createOrderStrategy.rules.settings.refer.list : [],
        plainOptions: state.createOrderStrategy.rules.settings.orderSource ? state.createOrderStrategy.rules.settings.orderSource.list : []
    };
}
const mapDispatchToProps = (dispatch: Dispatch<actions.RulesAction>) => bindActionCreators(
    {
        onGetOrderState: actions.getOrderState,
        onGetService: actions.getService,
    },
    dispatch
);
export default connect<any, any, { form: any, onChange: (value: any) => void }>(mapStateToProps, mapDispatchToProps)(OrderPayRule as any);
