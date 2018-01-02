import * as React from 'react';
import cfg  from '../cfg';
import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
export interface RuleProps {
    form: any;
    strategyType: number;
    onChange: (values: any) => void;
}
namespace layout {
    export const formItemLayout2 = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 9 },
        },
    };
}
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
            return <Option value={item.id + ''} key={item.id}>{item.name}</Option>;
        });
        return Children;
    }
};

class SelectCategory extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        marketingType: 0,
        activityId: ''
    };
    selectType = (value) => {
        this.setState({
            marketingType: value
        });
        if (value !== '1') {
            this.setState({
                activityId: ''
            });
        }
        this.triggerChange({ marketingType: value  });
    }
    couponIdChange = (e) => {
        if (!('value' in this.props)) {
            this.setState({ activityId: e.target.value });
        }
        this.triggerChange({ activityId: e.target.value });
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    addCoupon = () => {
        const { getFieldDecorator } = this.props.form;
        return this.state.marketingType === '1' ? (
            <FormItem {...layout.formItemLayout2} label="优惠券" hasFeedback={false}>
                {getFieldDecorator('coupon', {
                    rules: [{
                        required: true, message: '优惠券id不能为空！',
                    }]
                })(
                    <Input placeholder="请输入优惠券ID" onChange={this.couponIdChange}/>
                )}
            </FormItem>
        ) : '';
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { strategyType } = this.props;
        var newMarketingArray: any = [];
        if (strategyType === 5 || strategyType === 7) {
            // 无发券功能
            newMarketingArray = cfg.marketingType;
        } else {
            // 有发券功能
            newMarketingArray = cfg.marketingAllType;
        }
        return (
            <Row className="marketingCategoryRow">
                <Col span={6}>
                    <FormItem hasFeedback={false}>
                        {
                            getFieldDecorator('marketingCategory', {
                                rules: [{
                                    required: true, message: '营销类别不能为空',
                                }],
                            })(
                                <Select 
                                    placeholder="请选择营销类别!" 
                                    style={{ width: 200 }} 
                                    onChange={this.selectType}
                                >
                                    {selectcChildren(newMarketingArray)}
                                </Select>
                            )
                        }
                    </FormItem>
                </Col>
                <Col span={9}>
                    {this.addCoupon()}
                </Col>
            </Row>
        );
    }
}

export default SelectCategory;