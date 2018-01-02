import * as React from 'react';
import '../pendant/style.scss';
import { Form, Select, Button } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
const Option = Select.Option;
export interface RuleProps {
    form: any;
    onChange: (value: any) => void;
}
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 7 }, },
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
let subject = [
    {
        label: '家政',
        value: '71'
    }
];
/**
 * 数组每项增加一个key值，组件要求
 * @param arr  传入需要处理的数组
 */
export const arrayAddKey = (arr: any) => {
    if (arr && arr.length > 0) {
        let array = arr.map( (item, i) => Object.assign({}, item, { key: i }) );
        return array;
    }
};
/**
 * 提取select框内部选项通用部分
 * @param arr 传入数组
 */
export const selectcChildren = (arr: any) => {
    if (arr && arr.length > 0) {
        let Children = arrayAddKey(arr).map((item) => {
            return <Option value={item.value + ''} key={item.value}>{item.label}</Option>;
        });
        return Children;
    }
};
class ValueRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        editing: false,
        rules: []
    };
    selectSubject = (value) => {
        let val = `${value}`;
        console.log('val', val);
    }
   
    onSave = () => {
        this.props.form.validateFields(['ownerSubject'], (err, values) => {
            if (!err) {
                console.log('value', values);
                this.computeShowData(values);
                this.props.onChange(values);
            }
        });
    }
    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }
    computeShowData = (values: any) => {
        let rules: { label: string; value: string }[] = [];
        for ( let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';
            console.log('item', item);
            switch (item) {
                case 'ownerSubject':
                    label = '归属主体';
                    value = getKeysValues(subject, values.ownerSubject, 'value', 'label');
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
        const rules = [ ...this.state.rules ];
        const { getFieldDecorator } = this.props.form;

        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    
                    <FormItem label="归属主体" {...layout.formItemLayout}>
                        {getFieldDecorator('ownerSubject', {
                          rules: [{
                              required: true, message: '请选择归属主体！',
                            }]
                        })(
                            <Select placeholder="请选择" style={{ marginLeft: '10px', width: '130px' }} onChange={this.selectSubject}>
                                {selectcChildren(subject)}
                            </Select> 
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

export default ValueRule;
