import * as React from 'react';
import './style.scss';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../../actions';
import { StoreState } from '../../../types/index';
import { bindActionCreators } from 'redux';
import { Form, Input, Transfer, Checkbox, Button, Row, Col } from 'antd';
import { default as ShowRule } from '../showRuleInfo';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
export interface RuleProps {
    form: any;
    pageName: string;
    onChange: (value: any) => void;
    getPageName: (id: number) => void;
    rulesD: {strategyType: number; setting: any; };
    cityList: any;
    plainOptions: any;
}
namespace layout {
    export const formItemLayout = {
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
class PendantRule extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        editing: false,
        pageId: 0,
        checkedList: [],
        indeterminate: true,
        checkAll: false,
        rules: []
    };
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    handleTransferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
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
    onSave = () => {
        this.props.form.validateFields(['pageId', 'orderSource', 'city'], (err, values) => {
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
    getPageName = () => {
        console.log(0);
        if (this.state.pageId !== 0) {
            const { getPageName } = this.props;
            getPageName(this.state.pageId);
        }
    }
    computeShowData = (values: any) => {
        let rules: { label: string; value: string }[] = [];
        for ( let item of Object.keys(values)) {
            let label: string = '';
            let value: string = '';
            console.log('item', item);
            switch (item) {
                case 'pageId':
                    label = '页面ID';
                    value = `${values.pageId}`;
                    break;
                case 'city':
                    label = '城市列表';
                    value = getKeysValues(this.props.cityList, values.city.map((one) => `${parseInt(one, 10)}`), 'value', 'label');
                    break;
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
    pageIdChange = (e) => {
        this.setState({
            pageId: e.target.value
        });
    } 
    render() {
        let triggerRuleTpl: React.ReactNode = {};
        let triggerPageName: any = {};
        let wrapperStyle: any = {};
        let btnStyle: any = {};
        const rules = [ ...this.state.rules ];
        const { cityList, plainOptions, pageName } = this.props;
        const { getFieldDecorator } = this.props.form;
        // 遍历增加一个key
        const cities = cityList.map((item, index) => {
            return {
                title: item.label,
                value: item.value,
                key: `${item.value}`
            };
        });
        if (!!pageName) {
            triggerPageName = (
                <FormItem label="页面名称" {...layout.formItemLayout1}>
                    <p>{pageName}</p>
                </FormItem>
            );
        } else {
            triggerPageName = ('');
        }
        if (this.state.editing) {
            triggerRuleTpl = (
                <section className="editInfo">
                    <Row>
                        <Col span={10}>
                            <FormItem label="页面ID" {...layout.formItemLayout1}>
                                {getFieldDecorator('pageId', {
                                    rules: [{
                                        required: true, message: 'ID不能为空！',
                                    }]
                                })(
                                    <Input onChange={this.pageIdChange}/>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem {...layout.formItemLayout1}>
                                <Button style={{'marginLeft': 20}} onClick={this.getPageName}>查询</Button>
                            </FormItem> 
                        </Col>
                        <Col span={10}>
                            {triggerPageName}
                        </Col>
                    </Row>
                    <FormItem label="城市列表" {...layout.formItemLayout}>
                        {getFieldDecorator('city', {
                            rules: [{
                                required: true, message: '请选择城市！',
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
        pageName: state.strategyRules.pageName,
        rulesD: state.createOrderStrategy.rules,
        cityList: state.createOrderStrategy.rules.settings.city ? state.createOrderStrategy.rules.settings.city.list : [],
        plainOptions: state.createOrderStrategy.rules.settings.orderSource ? state.createOrderStrategy.rules.settings.orderSource.list : []
    };
}
const mapDispatchToProps = (dispatch: Dispatch<actions.RulesAction>) => bindActionCreators(
    {
        getPageName: actions.pageName
    },
    dispatch
);
export default connect<any, any, { form: any, onChange:  (value: any) => void}>(mapStateToProps, mapDispatchToProps)(PendantRule as any);