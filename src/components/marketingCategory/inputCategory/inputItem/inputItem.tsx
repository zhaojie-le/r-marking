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
// export const iconShow = (index, plusClick, minusClick) => {
//     if (index === 0) {
//         return (<Icon type="plus-circle-o" onClick={plusClick(index)} />);
//     } else {
//         return (<Icon type="minus-circle-o" onClick={minusClick(index)} />);
//     }
// };
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
export const selectcChildren = (arr: any, getFieldDecorator: any, getValueChange: any, getCouponChange: any ) => {
    if (arr && arr.length > 0) {
        let Children = arrayAddKey(arr).map((item, index) => {
            return (
                <Row key={index}>
                    <Col span={10}>
                        <FormItem hasFeedback={false} label="充值金额" {...layout.formItemLayout}>
                           <Input onChange={getValueChange}/>
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem hasFeedback={false} label="优惠券" {...layout.formItemLayout}>
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
        valueSum: '',
        couponId: ''
    };
    plusClick = (index: number) => {
        console.log('plus');
    }
    minusClick = (index: number) => {
        console.log('minus');
    }
    getValueChange = (e) => {
        console.log(e.target.value);
        this.setState({
            valueSum : e.target.value
        });
        this.triggerChange({valueSum : e.target.value, couponId : this.state.couponId});
    }
    getCouponChange = (e) => {
        console.log(e.target.value);
        this.setState({
            couponId : e.target.value
        });
        this.triggerChange({valueSum : this.state.valueSum, couponId : e.target.value});
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            let valueObj = Object.assign({}, this.state.changeItem, changedValue);
            console.log('change', valueObj);
            onChange(valueObj);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row className="marketingCategoryRow" style={{ width: '90%', display: 'inline-block'}}>
                {selectcChildren(couponList, getFieldDecorator, this.getValueChange, this.getCouponChange)}
            </Row>
        );
    }
}
export default InputItemCategory;