import * as React from 'react';
import '../pendant/style.scss';
import { Form, Button, Input, Row, Col, Radio } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
export interface RuleProps {
    form: any;
    onChange: (value: any) => void;
}
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 10 }, },
    };
    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
    };
}

class PushMessageRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        editing: false,
        rules: [],
        value: 0
    };
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    onSave = () => {
        this.props.form.validateFields(['sourceKey'], (err, values) => {
            if (!err) {
                this.computeShowData(values);
                // 增加防打扰开关字段
                let sendValue = Object.assign({}, values, { antiDisturb: this.state.value });
                this.props.onChange(sendValue);
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
        for (let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';
            switch (item) {
                case 'sourceKey':
                    label = '外推消息';
                    value = `${values.sourceKey}`;
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
        const rules = [...this.state.rules];
        const { getFieldDecorator } = this.props.form;

        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <Row>
                        <Col span={15}>
                            <FormItem label="外推消息" {...layout.formItemLayout}>
                                {getFieldDecorator('sourceKey', {
                                    rules: [{
                                        required: true, message: '请输入外推消息！',
                                    }]
                                })(
                                    <Input placeholder="请输入外推消息" />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label="防打扰开关" {...layout.formItemLayout}>
                                <Radio onChange={this.onChange} value={1} />
                            </FormItem>
                        </Col>
                    </Row>

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

export default PushMessageRule;
