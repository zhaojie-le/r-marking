import * as React from 'react';
import '../pendant/style.scss';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../../actions';
import { StoreState } from '../../../types/index';
import { bindActionCreators } from 'redux';
import { Form, Checkbox, Button, Transfer, Input, message } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
export interface RuleProps {
    form: any;
    rulesD: {};
    serviceList: any[];
    onChange: (value: any) => void;
    city: { name: string; value: string; type: string; list: any[] };
    plainOptions: any;
    getHomePageCount: number;

}
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, },
    };
    export const formItemLayout2 = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, },
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
        rules: []
    };

    onCheckChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.props.plainOptions.length),
            checkAll: checkedList.length === this.props.plainOptions.length,
        });
    }
    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }

    onSave = () => {
        this.props.form.validateFields(['orderSource', 'city', 'weight'], (err, values) => {
            var r = /^\+?[1-9][0-9]*$/; // 正整数
            var valsort = values.weight.replace(/[\s]/g, '');
            var flag = r.test(valsort);
            if (!flag) {
                message.error('请输入正整数');
            } else if (values.weight < 1 || values.weight > this.props.getHomePageCount + 1) {
                message.error('输入的数字已经超过范围');
            } else {
                if (!err) {
                    console.log('valuesssfrferfref====' + JSON.stringify(values));
                    this.computeShowData(values);
                    this.props.onChange(values);
                }
            }
        });
    }

    handleTransferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    computeShowData = (values: any) => {
        let rules: { label: string; value: string }[] = [];
        for (let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';
            switch (item) {
                case 'city':
                    label = '城市';
                    value = getKeysValues(this.props.city.list, values.city.map((one) => `${parseInt(one, 10)}`), 'value', 'label');
                    break;
                case 'orderSource':
                    label = '首页渠道';
                    value = '到家app首页';
                    break;
                case 'weight':
                    label = '权重';
                    value = values[item];
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
        const { plainOptions, city, getHomePageCount } = this.props;
        const rules = [...this.state.rules];
        const { getFieldDecorator } = this.props.form;
        const cities = city.list.map((item, index) => {
            return {
                title: item.label,
                value: item.value,
                key: `${item.value}`
            };
        });

        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <FormItem label="首面渠道" {...layout.formItemLayout}>
                        {getFieldDecorator('orderSource', {
                            rules: [{
                                required: true, message: '请选择首页渠道',
                            }],
                        })(
                            <CheckboxGroup options={plainOptions} onChange={this.onCheckChange} />
                            )}
                    </FormItem>
                    <FormItem label="城市" {...layout.formItemLayout}>
                        {getFieldDecorator('city', {
                            rules: [{
                                required: true, message: '服务项不能为空！',
                            }]

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
                    <FormItem label="权重" {...layout.formItemLayout2} >
                        {getFieldDecorator('weight', {
                            rules: [{ required: true, message: '权重不能为空！' }],
                        })(
                            <Input placeholder="请输入权重" style={{ 'width': 200, 'float': 'left', }} />
                            )}
                        <span style={{ 'color': 'red', 'lineHeight': '18px', 'display': 'inherit' }}>已有进行策略{getHomePageCount}个，请输入当前策略的顺序限1-{getHomePageCount + 1}
                            若对同一用户存在多个策略时，策略权重数值越小，优先级越高</span>
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

        city: state.createOrderStrategy.rules.settings.city ? state.createOrderStrategy.rules.settings.city : { list: [] },
        getHomePageCount: state.createOrderStrategy.getHomePageCount,
        // serviceList: state.createOrderStrategy.rules.settings.refer ? state.createOrderStrategy.rules.settings.refer.list : [],
        plainOptions: state.createOrderStrategy.rules.settings.orderSource ? state.createOrderStrategy.rules.settings.orderSource.list : []
    };
}
const mapDispatchToProps = (dispatch: Dispatch<actions.RulesAction>) => bindActionCreators(
    {

    },
    dispatch
);
export default connect<any, any, { form: any, onChange: (value: any) => void }>(mapStateToProps, mapDispatchToProps)(OrderPayRule as any);
