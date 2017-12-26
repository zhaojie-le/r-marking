import * as React from 'react';
import { Form, Input, Row, Col, Radio, Icon } from 'antd';
const FormItem = Form.Item;
export interface RuleProps {
    form: any;
    onChange: (values: any) => void;
}
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 12 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, },
    };
}
let couponList = [
    {
        moneySum: '',
        id: ''
    }
];
export const iconShow = (index) => {
    if (index === 0) {
        return (<Icon type="plus-circle-o" />);
    } else {
        return (<Icon type="minus-circle-o"/>);
    }
};
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
export const selectcChildren = (arr: any, getFieldDecorator: any) => {
    if (arr && arr.length > 0) {
        let Children = arrayAddKey(arr).map((item, index) => {
            return (
                <Row key={index}>
                    <Col span={10}>
                        <FormItem hasFeedback={false} label="充值金额" {...layout.formItemLayout}>
                            {
                                getFieldDecorator(`cashValue-${index}`, {
                                    rules: [{
                                        required: true, message: '金额不能为空',
                                    }]
                                })(
                                    <Input />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem hasFeedback={false} label="优惠券" {...layout.formItemLayout}>
                            {
                                getFieldDecorator(`coupon-${index}`, {
                                    rules: [{
                                        required: true, message: '优惠券ID不能为空',
                                    }]
                                })( 
                                    <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <FormItem style={{'marginLeft': 30}}>
                            {iconShow(index)}
                        </FormItem>
                    </Col>
                </Row>
            );
        });
        return Children;
    }
};
class InputCategory extends React.Component<RuleProps, {}> {
    constructor(props: any) {
        super(props);
    }
    state: any = {
        couponList: []
    };
    add = (index: number) => {
        console.log(0);
    }
    minus = (index: number) => {
        console.log(1);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Row className="marketingCategoryRow">
                <Col span={3} className="marketingCategoryLabel"><label>营销类别：</label></Col>
                <Col span={10}>
                    <FormItem>
                        <Radio defaultChecked={true}>发券</Radio>
                    </FormItem>
                    {selectcChildren(couponList, getFieldDecorator)}
                </Col>
            </Row>
        );
    }
}

export default InputCategory;