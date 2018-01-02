import * as React from 'react';
import { Form, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
export interface RuleProps {
    form: any;
    onChange: (values: any) => void;
}
let couponList = [
    {
        moneySum: '',
        id: ''
    }
];
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 12 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, },
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
export const selectcChildren = (arr: any, getFieldDecorator: any, getAmountLowChange: any, getAmountUpChange: any, getCouponChange: any ) => {
    if (arr && arr.length > 0) {
        let Children = arrayAddKey(arr).map((item, index) => {
            return (
                <Row key={index}>
                    <Col span={8}>
                        <FormItem hasFeedback={false} label="充值下限" {...layout.formItemLayout}>
                           <Input onChange={getAmountLowChange}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem hasFeedback={false} label="充值上限" {...layout.formItemLayout}>
                           <Input onChange={getAmountUpChange}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem hasFeedback={false} label="优惠券ID" {...layout.formItemLayout}>
                            <Input onChange={getCouponChange}/>
                        </FormItem>
                    </Col>
                </Row>
            );
        });
        return Children;
    }
};
class InputItemCategory extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        couponList: [],
        rechargeAmountLow: '',
        rechargeAmountUp: '',
        result: ''
    };
    getAmountLowChange = (e) => {
        this.setState({
            rechargeAmountLow : e.target.value
        });
        console.log('low', e.target.value);
        this.triggerChange({rechargeAmountLow : e.target.value, rechargeAmountUp: this.state.rechargeAmountUp, result : this.state.result});
    }

    getAmountUpChange = (e) => {
        this.setState({
            rechargeAmountUp : e.target.value
        });
        this.triggerChange({rechargeAmountLow : this.state.rechargeAmountLow, rechargeAmountUp: e.target.value, result : this.state.result});
    }
    getCouponChange = (e) => {
        this.setState({
            result : e.target.value
        });
        this.triggerChange({rechargeAmountLow : this.state.rechargeAmountLow, rechargeAmountUp: this.state.rechargeAmountUp, result : e.target.value});
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            let valueObj = Object.assign({}, this.state.changeItem, changedValue, {ownerSubject: '71'});
            console.log('valueObj', valueObj);
            onChange(valueObj);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row className="marketingCategoryRow" style={{ width: '90%', display: 'inline-block'}}>
                {selectcChildren(couponList, getFieldDecorator, this.getAmountLowChange, this.getAmountUpChange, this.getCouponChange)}
            </Row>
        );
    }
}
export default InputItemCategory;