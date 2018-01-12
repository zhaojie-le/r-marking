import * as React from 'react';
import {
    Button,
    Form
} from 'antd';

const FormItem = Form.Item;

interface Prop {
    value?: any;
    stage?: any;
    form: { getFieldDecorator: any; validateFields: any; [propName: string]: any; };
    onChange: (value: any) => any;
}

namespace layout {
    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
    };
    export const modelItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
    };
}

export default (check: (rule: any, value: any, callback: any) => void, ShowData: any, typelabel: string, initialValue: any) => <T extends Prop, D>(WrappedComponent) => {
    return class SwitchState extends React.Component<T, {}> {
        state: {
            editing: boolean;
            showData: { yxfs: {} }
        };

        constructor(props: any, context: any) {
            super(props, context);
            this.state = {
                editing: false,
                showData: initialValue.yxfs ? initialValue : { yxfs: this.props.value }
            };
        }

        onEdit = (isEditing) => {
            this.setState({
                editing: isEditing
            });
        }

        onSave = () => {
            const fields = [`yxfs`];
            this.props.form.validateFields(fields, (err, values) => {
                if (!err) {
                    this.setState({showData: values});
                    this.props.onChange(values.yxfs);
                    this.onEdit(false);
                }
            });
        }

        onYxfsChange(value: D) {
            console.log(value);
        }

        getContentTpl = () => {
            const { getFieldDecorator } = this.props.form;
            const stage = this.props.stage;
            const tpl = this.state.editing
            ? (
                <div className="wrapperModel">
                    <FormItem {...layout.modelItemLayout} label={`${typelabel}`}>
                        {getFieldDecorator(`yxfs`, {
                            initialValue: this.state.showData.yxfs,
                            rules: [{
                                required: true,
                                validator: check
                            }],
                        })(
                            <WrappedComponent onchange={this.onYxfsChange} stage={stage} form={this.props.form} />
                        )}
                    </FormItem>
                    <FormItem {...layout.tailFormItemLayout} style={{borderBottom: 'none'}}>
                        <Button type="primary" onClick={this.onSave}>保存</Button>
                        <Button onClick={() => this.onEdit(false)} style={{marginLeft: '10px'}}>取消</Button>
                    </FormItem>
                </div>
            )
            : (
                <div className="wrapperModel">
                    <ShowData values={this.state.showData.yxfs} />
                </div>
            );

            return tpl;
        }

        render() {
            let wrapperStyle = {};
            let btnStyle = {};

            if (this.state.editing) {
                btnStyle = {display: 'none'};
            } else {
                wrapperStyle = { background: '#fff', border: 'none'};
                btnStyle = {display: 'block'};
            }

            return (
                <div className="marketingModel" style={wrapperStyle}>
                    <div className="triggerRules">
                        <div className="ruleContent">
                            {this.getContentTpl()}
                        </div>
                        <div>
                            <Button onClick={() => this.onEdit(true)} style={btnStyle}>编辑</Button>
                        </div>
                    </div>
                </div>
            );
        }
    };
};
