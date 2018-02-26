import * as React from 'react';
import '../pendant/style.scss';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../../actions';
import { StoreState } from '../../../types/index';
import { bindActionCreators } from 'redux';
import { Form, Button, Cascader, Transfer, Radio, Col, Row, InputNumber, message } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export interface RuleProps {
    form: any;
    rulesD: {};
    serviceList: any[];
    onChange: (value: any) => void;
    serviceOptions: any[];
    plainOptions: any;
    onGetService: (cp: { lineId: number; cateId: number }) => void;
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

// function getKeysValues(obj: any, keys: any, key: string = 'value', label: string = 'label'): string {
//     return obj.filter((item) => {
//         return keys.includes(item[key]);
//     }).map((item) => {
//         return item[label];
//     }).join();
// }
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
        value: 1,
        serviceOptions: [],
        selectedLabel: ''
    };

    onRadioGroup = (e) => {
        this.setState({
            value: e.target.value,
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
    onSave = () => {
        this.props.form.validateFields(['refer', 'pushTime', 'hourBrower', 'minuteBrower'], (err, values) => {
            if (!err) {
                if (values.hourBrower !== undefined) {
                    console.log(11);
                    const pushTime = values.hourBrower * 24 + values.minuteBrower;
                    if (pushTime < 5) {
                        message.error('用户浏览时间不能小于5分钟');
                    } else if (pushTime > 24 * 60) {
                        message.error('用户浏览时间不能大于24小时');
                    } else {
                        values.pushTime = pushTime;
                        values.pushTimeType = this.state.value;
                        this.computeShowData(values);
                        delete values.hourBrower;
                        delete values.minuteBrower;
                        this.props.onChange(values);
                    }
                } else {
                    values.pushTimeType = this.state.value;
                    this.computeShowData(values);
                    this.props.onChange(values);
                }


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
                case 'pushTimeType':
                    label = '推送时间模式';
                    value = this.state.value === 1 ? '延迟时间' : '固定时间推送';
                    break;
                case 'pushTime':
                    label = '时间';
                    value = this.state.value === 2 ? values[item] : `${values.hourBrower}小时${values.minuteBrower}分钟`;
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
        const { serviceList } = this.props;
        const rules = [...this.state.rules];
        const { getFieldDecorator } = this.props.form;

        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <FormItem label="服务项" {...layout.formItemLayout}>
                        {getFieldDecorator('refer', {
                            rules: [{
                                required: true, message: '服务项不能为空！',
                            }]
                        })(
                            <Cascader placeholder="请输入服务项！" options={serviceList} onChange={this.onServiceChange} />
                            )}
                    </FormItem>
                    {this.serviceOption()}
                    <FormItem label="推送时间模式" {...layout.formItemLayout}>
                        {getFieldDecorator('pushTimeType', {
                            rules: [{
                                required: true, message: '推送时间模式不能为空！',
                            }],
                        })(
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <RadioGroup onChange={this.onRadioGroup} value={this.state.value}>
                                    <Radio value={1}>延迟时间</Radio>
                                    <Radio value={2}>固定时间推送</Radio>
                                </RadioGroup>
                            </div>
                            )}
                    </FormItem>
                    {this.state.value === 1 ?
                        <Row className="setDelayTime" style={{ padding: 0 }}>
                            <Col span={4} className="delayTimeLabel"><label>用户浏览时间：</label></Col>
                            <Col span={3}>
                                <FormItem hasFeedback={false}>
                                    {getFieldDecorator('hourBrower', {
                                        rules: [{
                                            required: true, message: '小时不能为空！',
                                        }],
                                    })(
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            style={{ width: '90%' }}
                                        />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={1}>
                                <span className="lh30">小时</span>
                            </Col>
                            <Col span={3}>
                                <FormItem>
                                    {getFieldDecorator('minuteBrower', {
                                        rules: [{
                                            required: true, message: '分钟不能为空！',
                                        }],
                                    })(
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            style={{ width: '90%' }}
                                        />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={1}>
                                <span className="lh30">分钟</span>
                            </Col>
                        </Row> :
                        <FormItem label="固定推送时间" {...layout.formItemLayout}>
                            {getFieldDecorator('pushTime', {
                                rules: [{
                                    required: true, message: '固定推送时间不能为空！',
                                }],
                                initialValue: '09:50:00'
                            })(
                                <InputNumber min={1} max={100} disabled={true} />
                                )}
                        </FormItem>
                    }
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
        rulesD: state.createOrderStrategy.rules,
        serviceOptions: state.createOrderStrategy.serviceOptions,
        serviceList: state.createOrderStrategy.rules.settings.refer ? state.createOrderStrategy.rules.settings.refer.list : [],
        plainOptions: state.createOrderStrategy.rules.settings.orderSource ? state.createOrderStrategy.rules.settings.orderSource.list : []
    };
}
const mapDispatchToProps = (dispatch: Dispatch<actions.RulesAction>) => bindActionCreators(
    {
        onGetService: actions.getService,
    },
    dispatch
);
export default connect<any, any, { form: any, onChange: (value: any) => void }>(mapStateToProps, mapDispatchToProps)(OrderPayRule as any);
