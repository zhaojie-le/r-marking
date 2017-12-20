import * as React from 'react';
import './style.scss';
import { Form, Input, Transfer } from 'antd';
const FormItem = Form.Item;
export interface RuleProps {
  form: any;
  // ruleData: any;
}
// 写死的假数据
let ruleData = [
      {
          label: 'city',
          list: [
             {
                  label: '北京',
                  value: '1'
              }
          ],
          title: '城市',
          type: 'cityType'
      },
      {
          label: 'pageId',
          title: '页面Id',
          type: 'textInput'
      },
      {
          label: 'orderSource',
          list: [
              {
                  label: '全部',
                  value: '-999'
              },
              {
                  label: '到家APP',
                  value: '16|17|20'
              },
              {
                  label: '微信',
                  value: '2|35|104'
              },
              {
                  label: '其他h5',
                  value: '-8'
              }
          ],
          title: '页面渠道',
          type: 'radioBox'
      }
  ];
namespace layout {
  export const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, },
  };
}
class PendantRule extends React.Component<RuleProps, {}> {
  constructor (props: any) {
    super (props);
  }
  state: any = {

  };
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }
  handleTransferChange = () => {
    console.log(1);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const rule = this.props.ruleData;
    const rule = ruleData;
    console.log(rule[0]);
    const city = [{label: '北京', value: '1'}, {label: '上海', value: '2'}];
    // 遍历增加一个key
    const cities = city.map((item, index) => {
      return {
          title: item.label,
          value: item.value,
          key: `${item.value}`
      };
    });
    
    return (
      <div className="pendantWrap">
        <section className="editWrap">
          <div className="itemWrap">
            <FormItem label="页面ID" {...layout.formItemLayout}>
              {getFieldDecorator('page-id', {
                rules: [{
                  required: true, message: 'ID不能为空！',
                }]
              })(
                <Input />
              )}
            </FormItem> 
            <FormItem label="页面名称" {...layout.formItemLayout}>
              {getFieldDecorator('page-name')(
                <Input />
              )}
            </FormItem>
            <FormItem label="城市列表" {...layout.formItemLayout}>
              {getFieldDecorator('city', {
                rules: [{
                  required: true, message: '请选择城市！',
                }],
                  // initialValue: this.props.formState.city.value,
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
          </div>
        
        </section>  
      </div>
      
    );
  }
}
export default PendantRule;