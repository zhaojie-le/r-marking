import * as React from 'react';
import '../pendant/style.scss';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../../actions';
import { StoreState } from '../../../types/index';
import { bindActionCreators } from 'redux';
import { Form, Button, Input, Row, Col } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
export interface RuleProps {
    form: any;
    count: number;
    onChange: (value: any) => void;
    userCount: (id: number) => void;
}
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 14 }, },
    };
    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
    };
}
class ImportUserRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        deiting: false,
        rules: [],
        batchId: 0
    };
    getUserCount = () => {
        const { userCount } = this.props;
        if (!!this.state.batchId) {
            userCount(this.state.batchId);
        }
    }
    inputChange = (e) => {
        this.setState({
            batchId: e.target.value
        });
    }
    onSave = () => {
        this.props.form.validateFields(['userBatchId'], (err, values) => {
            if (!err) {
                console.log('userBatchId', values);
                let sendValue = Object.assign({}, values, {usertCount: this.props.count });
                this.computeShowData(sendValue);
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
        for ( let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';
            switch (item) {
                case 'userBatchId':
                    label = '用户批次id';
                    value = `${values.userBatchId}`;
                    break;
                case 'usertCount':
                    label = '该批次用户数';
                    value = `${values.usertCount}`;
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
    render () {
        let triggerRuleTpl: React.ReactNode = {};
        let wrapperStyle: any = {};
        let btnStyle: any = {};
        const rules = [ ...this.state.rules ];
        const { getFieldDecorator } = this.props.form;
        const { count } = this.props;
        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <Row>
                        <Col span={10}>
                            <FormItem label="用户批次id" {...layout.formItemLayout}>
                                {getFieldDecorator('userBatchId', {
                                    rules: [{
                                        required: true, message: '请输入批次Id',
                                        }]
                                    })(
                                        <Input onChange={this.inputChange}/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={4}>
                                <Button onClick={this.getUserCount}>查询</Button>
                        </Col>
                        <Col span={10}>
                            <p>该批次共{count}个用户</p>
                        </Col>
                    </Row>                
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
function mapStateToProps (state: StoreState) {
    return {
        count: state.strategyRules.userCount
    };
}
const mapDispatchToProps = (dispatch: Dispatch<actions.RulesAction>) => bindActionCreators(
    {
        userCount: actions.userCount
    },
    dispatch
);
export default connect<any, any, {form: any, onChange: (value: any) => void}>(mapStateToProps, mapDispatchToProps)(ImportUserRule as any);