import * as React from 'react';
import './style.scss';
import { Form, Input, Transfer, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
export interface RuleProps {
    form: any;
    onChange: (value: any) => void;
    // ruleData: any;
}
// 写死的假数据
let ruleData = [
    {
        label: 'city',
        list: [
            {
                label: '北京',
                value: '1'
            }
        ],
        title: '城市',
        type: 'cityType'
    },
    {
        label: 'pageId',
        title: '页面Id',
        type: 'textInput'
    },
    {
        label: 'orderSource',
        list: [
            {
                label: '全部',
                value: '-999'
            },
            {
                label: '到家APP',
                value: '16|17|20'
            },
            {
                label: '微信',
                value: '2|35|104'
            },
            {
                label: '其他h5',
                value: '-8'
            }
        ],
        title: '页面渠道',
        type: 'radioBox'
    }
];
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, },
    };
    export const formItemLayout1 = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 5 }, },
    };
    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
    };
}
const plainOptions = [
    {
        label: '全部',
        value: '-999'
    },
    {
        label: '到家APP',
        value: '16|17|20'
    },
    {
        label: '微信',
        value: '2|35|104'
    },
    {
        label: '其他h5',
        value: '-8'
    }
];
class PendantRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        editing: false,
        checkedList: [],
        indeterminate: true,
        checkAll: false,
    };
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    handleTransferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
    onCheckChange = (checkedList) => {
        // const plainOptions = this.props.orderSource;

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }
    onSave = () => {
        this.props.form.validateFields(['pageId', 'pageName', 'orderSource', 'city'], (err, values) => {
            if (!err) {
                console.log('value', values);
                // this.computeShowData(values);
                this.props.onChange(values);
                // this.props.onSaveRule(JSON.stringify(values));
            }
        });
    }
    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }
    render() {
        let triggerRuleTpl: React.ReactNode = {};
        let wrapperStyle: any = {};
        let btnStyle: any = {};
        const { pageIdLabel = '无', pageNameLabel = '无', cityLabel = '无', orderSourceLabel = '无' } = this.state;
        const { getFieldDecorator } = this.props.form;
        // const rule = this.props.ruleData;
        const rule = ruleData;
        console.log(rule[0]);
        const city = [{ label: '北京', value: '1' }, { label: '上海', value: '2' }];
        // 遍历增加一个key
        const cities = city.map((item, index) => {
            return {
                title: item.label,
                value: item.value,
                key: `${item.value}`
            };
        });

        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <FormItem label="页面ID" {...layout.formItemLayout1}>
                        {getFieldDecorator('pageId', {
                            rules: [{
                                required: true, message: 'ID不能为空！',
                            }]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="页面名称" {...layout.formItemLayout1}>
                        {getFieldDecorator('pageName')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="城市列表" {...layout.formItemLayout}>
                        {getFieldDecorator('city', {
                            rules: [{
                                required: true, message: '请选择城市！',
                            }],
                            // initialValue: this.props.formState.city.value,
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
                    <Button onClick={() => this.onEdit(false)} style={{marginLeft: '10px'}}>取消</Button>
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
                <section className="showInfo">
                    <p><label>规则名称:</label><span>页面挂件</span></p>
                    <p><label>页面ID:</label><span>{pageIdLabel}</span></p>
                    <p><label>页面名称:</label><span>{pageNameLabel}</span></p>
                    <p><label>选择城市:</label><span title={cityLabel}>{cityLabel}</span></p>
                    <p><label>页面渠道:</label><span>{orderSourceLabel}</span></p>
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
export default PendantRule;