import * as React from 'react';
import './style.scss';
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
function selectChildren (arr: any): any {
    if (arr && arr.length > 0) {
        let Children = arr.map((item, index) => {
            return (
                <div key={index} className="showDate">
                    <span>输入下限：{item.rechargeAmountLow}</span><span>输入上限：{item.rechargeAmountUp}</span><span>优惠券id：{item.result}</span>
                </div>
            );
        });
        return Children;
    } else {
        return (
            <div>请选择营销类别</div>
        );
    }
}

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
                    style={{paddingBottom: 0, borderBottom: 'none'}}
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
                        style={{position: 'absolute', top: 12, right: 0}}
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
                    <Button type="dashed" onClick={this.add} style={{ width: '76%', marginLeft: 75 }}>
                        <Icon type="plus" /> Add (每条数据范围不能一样)
                    </Button>
                </FormItem>
            </div>
        );
    }
}
export default switchEditState(
    (rule, value, callback) => {
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
                {type: 'require', value: objItem.rechargeAmountLow, errMsg: '券金额下限输入不能为空'},
                {type: 'require', value: objItem.rechargeAmountUp, errMsg: '券金额上限输入不能为空'},
                {type: 'require', value: objItem.result, errMsg: '券ID输入不能为空'}
            ])
        );
    },
    (props) => {
        const { values } = props;
        return selectChildren(values as any);
    },
    '储值返券',
    {yxfs: { rechargeAmountLow: '', rechargeAmountUp: '', result: '' }}
)(DynamicFieldSet);