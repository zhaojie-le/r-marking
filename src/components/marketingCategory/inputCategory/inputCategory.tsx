import * as React from 'react';
// import _obj from 'lodash/fp/object';
import { Form, Icon, Button, Radio } from 'antd';
import { default as switchEditState } from '../../marketingModel/switchEditState';
import { InputItemCategory } from './inputItem';
const FormItem = Form.Item;
const Micon: any = Icon;
export interface RuleProps {
    form: any;
    onChange: (values: any) => void;
}

function getBt(str: string): number {
    var char = str.replace(/[^\x00-\xff]/g, '**');
    return char.length;
}

function validate(fields: any[]): string {
    return fields.reduce(
        (last, item) => {
            switch (item.type) {
                case 'require':
                    return !item.value ? `${last}, ${item.errMsg}` : `${last}`;
                case 'limit':
                    return !!item.value && getBt(item.value) > item.limitNumber ? `${last}, ${item.errMsg}` : `${last}`;
                default:
                    return `${last}`;
            }
        },
        ''
    ).substring(1);
}
function objToArray (obj: any): any {
    let arr = Object.keys(obj);
    let valueArray: any = [];
    if (obj) {
        for (let i = 1; i <= arr.length; i++) {
            let item = obj[i];
            valueArray.push(item);
        }
        return valueArray;
    }       
}
export const selectcChildren = (arr: any) => {
    if (arr && arr.length > 0) {
        let Children = arr.map((item, index) => {
            return (
                <div key={index}>
                    <span>{item.valueSum}</span><span>{item.couponId}</span>
                </div>
                );
        });
        return Children;
    }
};

let uuid = 0;
class DynamicFieldSet extends React.Component<RuleProps, {}> {
    private allValues: any = {};
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        delete this.allValues[k];
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
        console.log('delete', this.allValues);
    }

    add = () => {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
        this.allValues[uuid] = null;
    }

    onInputItemChange = (value, key) => {
        const { getFieldValue } = this.props.form;
        const keys: any = getFieldValue('keys');
        this.allValues = Object.assign({}, this.allValues);
        keys.map((k, index) => {
            if (k === key) {
                this.allValues[k] = value;
            }
        });
        this.props.onChange(objToArray(this.allValues));
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys: any = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    // label={index === 0 ? 'Passengers' : ''}
                    required={false}
                    key={k}
                >
                <InputItemCategory onChange={(value) => this.onInputItemChange(value, k)} form={this.props.form} />
                {keys.length > 1 ? (
                    <Micon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
                </FormItem>
            );
        });
        return (
            <div>
                <FormItem>
                    <Radio defaultChecked={true}>发券</Radio>
                </FormItem>
                {formItems}
                <FormItem>
                    <Button type="dashed" onClick={this.add} style={{ width: '57%', marginLeft: 114 }}>
                        <Icon type="plus" /> Add (每条数据范围不能一样)
                    </Button>
                </FormItem>
            </div>
        );
    }
}
export default switchEditState(
    (rule, value, callback) => {
        console.log('values', value);
        let valLen = value.length;
        let objItem: any = {};
        if (valLen > 0) {
            for (let i = 0; i < valLen; i++) {
                objItem = value[i];
                if (objItem.rechargeAmountLow && objItem.rechargeAmountUp && objItem.result) {
                    callback();
                }
            }
        }
        callback(         
            validate([
                {type: 'require', value: objItem.rechargeAmountLow, errMsg: '输入不能为空'},
                {type: 'require', value: objItem.rechargeAmountUp, errMsg: '输入不能为空'},
                {type: 'require', value: objItem.result, errMsg: '输入不能为空'}
            ])
        );
    },
    (props) => {
        // const { value } = props;
        return (
            <div>
                ###
            </div>
        );
    },
    '储值返券',
    {yxfs: { valueSum: '', couponId: '' }}
)(DynamicFieldSet);