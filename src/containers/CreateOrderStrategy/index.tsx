import * as React from 'react';
import * as actions from '../../actions/createOrderStrategy';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
    Form,
    Input,
    Row,
    Col,
    Layout,
    Breadcrumb,
    Button,
    Cascader,
    Checkbox,
    Select,
    Transfer,
    InputNumber,
    DatePicker,
    Menu,
    Dropdown,
    Icon,
} from 'antd';
import './index.scss';

const { Content, Footer } = Layout;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    form?: any;
}

export interface RuleProps {
    form?: any;
}

interface CityProps {
    key: string;
    title: string;
    description: string;
    chosen: boolean;
}

class MarketingModel extends React.Component<RuleProps, {}> {
    state: any = {
        editing: false,
        channels: [],
        channelType: [[1, '短信'], [2, '58到家-APP push'], [3, '58到家公众号']],
    };

    constructor(props: any, context: any) {
        super(props, context);
    }

    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }

    onSave = () => {
        console.log(1);
    }

    handleMenuClick = (e) => {
        const newChannel = [...this.state.channels, e.key];
        const newChannelType = this.state.channelType.filter((item) => {
            return item[0] !== parseInt(e.key, 10);
        });
        this.setState({
            channels: newChannel,
            channelType: newChannelType
        });
    }
 
    shiftUp = () => {
        console.log(1);
    }

    deleteChannel = (index, label) => {
        const newChannelType = [...this.state.channelType, [index, label]];
        const newChannel = this.state.channels.filter((item) => {
            return index !== parseInt(item, 10);
        });
        this.setState({
            channels: newChannel,
            channelType: newChannelType
        });
    }

    geteratorChannel = () => {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = { 
            labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
        };

        return this.state.channels.map((item, i) => {
            switch (item) {
                case '1':
                    return (
                        <div key={i}>
                            <Row>
                                <Col span={3}>渠道{i}</Col>
                                <Col span={4}>短信</Col>
                                <Col span={3}>
                                    <Button onClick={this.shiftUp}>上移</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.deleteChannel(1, '短信')}>删除</Button>
                                </Col>
                            </Row>
                            <FormItem {...formItemLayout} label="文案" hasFeedback={false}>
                                {getFieldDecorator('copyWriting', {
                                    rules: [{
                                        required: true, message: '文案不能为空！',
                                    }],
                                })(
                                    <Input placeholder="请输入文案!"/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="跳转链接" hasFeedback={false}>
                                {getFieldDecorator('jumpLink', {
                                    rules: [{
                                        required: true, message: '跳转链接不能为空',
                                    }],
                                })(
                                    <Input placeholder="请输入跳转链接!"/>
                                )}
                            </FormItem>
                        </div>
                    );
                case '2':
                    return (
                        <div key={i}>
                            <Row>
                                <Col span={3}>渠道{i}</Col>
                                <Col span={4}>58到家-APP push</Col>
                                <Col span={3}>
                                    <Button onClick={this.shiftUp}>上移</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.deleteChannel(2, '58到家-APP push')}>删除</Button>
                                </Col>
                            </Row>
                            <FormItem {...formItemLayout} label="标题" hasFeedback={false}>
                                {getFieldDecorator('channelTile', {
                                    rules: [{
                                        required: true, message: '标题不能为空！',
                                    }],
                                })(
                                    <Input placeholder="请输入标题!"/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="文案" hasFeedback={false}>
                                {getFieldDecorator('copyWriting', {
                                    rules: [{
                                        required: true, message: '文案不能为空！',
                                    }],
                                })(
                                    <Input placeholder="请输入文案!"/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="跳转链接" hasFeedback={false}>
                                {getFieldDecorator('jumpLink', {
                                    rules: [{
                                        required: true, message: '跳转链接不能为空',
                                    }],
                                })(
                                    <Input placeholder="请输入跳转链接!"/>
                                )}
                            </FormItem>
                        </div>
                    );
                case '3':
                    return (<div key={i}>3</div>);
                default:
                    return (<div key={i}>4</div>);
            }
        });
    }

    generatorCreateMenu = () => {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {
                    this.state.channelType.map((item, i) => {
                        return <Menu.Item key={item[0]}>{item[1]}</Menu.Item>;
                    })
                }
            </Menu>
        );
        return (
            <Dropdown overlay={menu} style={{width: '120px'}}>
                <Button style={{width: '120px'}}>
                    添加渠道 <Icon type="down" />
                </Button>
            </Dropdown>
        );
    }

    getContentTpl = () => {
        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
        };

        if (this.state.editing) {
            return (
                <div>
                    {this.geteratorChannel()}
                    {this.generatorCreateMenu()}
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.onSave}>保存</Button>
                        <Button onClick={() => this.onEdit(false)} style={{marginLeft: '10px'}}>取消</Button>
                    </FormItem>
                </div>
            );
        } else {
            return (
                <div>
                    <p><span style={{color: 'red'}}>消息推送</span> 优先级：渠道1>渠道2>渠道3 优先渠道送达后，其他渠道将不再推送</p>
                </div>
            );
        }
    }

    render() {
        let wrapperStyle = {};
        let btnStyle = {};

        if (this.state.editing) {
            btnStyle = {display: 'none'};
        } else {
            wrapperStyle = { background: '#fff', border: 'none'};
            btnStyle = {display: 'block'};
        }
        return (
            <div className="marketingModel" style={wrapperStyle}>
                <label>营销方式：</label>
                <div className="triggerRules">
                    <div className="ruleContent">
                        {this.getContentTpl()}
                    </div>  
                    <div>
                        <Button onClick={() => this.onEdit(true)} style={btnStyle}>编辑</Button>
                    </div>
                </div>
            </div>
        );
    }
}

class StragyRule extends React.Component<RuleProps, {}> {
    state: any = {
        editing: false,
        checkedList: ['Apple', 'Orange'],
        indeterminate: true,
        checkAll: false,
    };

    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.getMock();
    }

    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }

    handleClick = (e, label, option) => {
        e.stopPropagation();
        console.log('clicked', label, option);
    }

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    onCheckChange = (checkedList) => {
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.form.setFieldsValue({
            orderSource: e.target.checked ? ['Apple', 'Pear', 'Orange'] : [],
        });
    }
    
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
      
    save = () => {
        console.log(1);
    }

    handleBlur = () => {
        console.log('blur');
    }
      
    handleFocus = () => {
        console.log('focus');
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    handleTransferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    getMock = () => {
        const targetKeys: Array<string> = [];
        const mockData: Array<object> = [];
        for (let i = 0; i < 20; i++) {
            const data: CityProps = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }

    render() {
        let triggerRuleTpl: React.ReactNode = {};
        let btnStyle = {};
        let wrapperStyle: any = {};
        let { checkedList } = this.state;
        const { getFieldDecorator } = this.props.form;

        const plainOptions = ['Apple', 'Pear', 'Orange'];     

        const options = [{
             value: '103',
             label: '司机',
             children: [{
                value: '204',
                label: '速运',
             }],
          }, {
              value: '101',
              label: '家政',
              children: [{
                  value: '203',
                  label: '搬家',
              }],
          }];
        const formItemLayout = { 
            labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
        };

        const formItemServiceItemLayout = { 
            labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 8 }, },
        };

        const tailFormItemLayout = {
            wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
        };

        if (this.state.editing) {
            triggerRuleTpl = (
                                <section className="editInfo">
                                    <FormItem label="服务项" {...formItemServiceItemLayout}>
                                        {getFieldDecorator('serviceItem', {
                                            rules: [{
                                                required: true, message: '策略名称不能为空！',
                                            }],
                                        })(
                                            <Cascader placeholder="请输入服务项！" options={options} onChange={this.onChange} />
                                        )}
                                    </FormItem>
                                    <FormItem label="订单来源" {...formItemLayout}>
                                        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                            <Checkbox
                                                indeterminate={this.state.indeterminate}
                                                onChange={this.onCheckAllChange}
                                                checked={this.state.checkAll}
                                            >
                                                全部
                                            </Checkbox>
                                            {getFieldDecorator('orderSource', {
                                                initialValue: checkedList,
                                                rules: [{
                                                    required: true, message: '策略名称不能为空！',
                                                }],
                                            })(
                                                <CheckboxGroup options={plainOptions} onChange={this.onCheckChange} />
                                            )}
                                        </div>
                                    </FormItem>
                                    <FormItem label="订单状态" {...formItemLayout}>
                                        {getFieldDecorator('orderState', {
                                            rules: [{
                                                required: true, message: '订单状态不能为空！',
                                            }],
                                        })(
                                            <Select
                                                showSearch={true}
                                                style={{ width: 200 }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                onChange={this.handleChange}
                                                onFocus={this.handleFocus}
                                                onBlur={this.handleBlur}
                                                filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem label="城市" {...formItemLayout}>
                                       {getFieldDecorator('city', {
                                            rules: [{
                                                required: true, message: '请选择城市！',
                                            }],
                                        })(
                                            <Transfer
                                                dataSource={this.state.mockData}
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
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" onClick={this.save}>保存</Button>
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
                               <section className="showInfo">
                                    <p><label>规则名称:</label><span>订单事件</span></p>
                                    <p><label>服务项:</label><span>三方合作</span><span>充值</span><span>充值</span></p>
                                    <p><label>订单来源:</label><span>微信、到家App</span></p>
                                    <p><label>订单状态:</label><span>已接单</span></p>
                                    <p><label>订单状态:</label><span>北京、上海、日本、东京、纽约</span></p>
                                </section>
                            );
        }
        return (
            <div className="wrapperRules" style={wrapperStyle}>
                <label>触发规则：</label>
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

class List extends React.Component<Props, object> {
    state = {
        editing: false
    };

    constructor(props: Props, context: any) {
        super(props, context);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    render() {
        const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
        const { getFieldDecorator } = this.props.form;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
        };
        
        const tailFormItemLayout = {
            wrapperCol: { 
                xs: { span: 24, offset: 0, },
                sm: { span: 19, offset: 3, },
            },
        };

        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 9 },
            },
        };
        
        return (
            <div id="orderStrategy">
                <Layout className="layout">
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">营销管理平台</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>创建策略</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="wrapperContainer">
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem {...formItemLayout} label="策略名称" hasFeedback={false}>
                                    {getFieldDecorator('stragyName', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <Input placeholder="请输入策略名称!"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="生效时间" hasFeedback={false}>
                                    {getFieldDecorator('time', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                    })(
                                        <RangePicker
                                            showTime={{ format: 'HH:mm:ss' }}
                                            format="YYYY-MM-DD HH:mm"
                                            placeholder={['开始时间', '结束时间']}
                                            onChange={onIncrement}
                                            onOk={onIncrement}
                                        />
                                    )}
                                </FormItem>
                                <StragyRule form={this.props.form}/>
                                <Row className="setDelayTime">
                                    <Col span={3} className="delayTimeLabel"><label>延迟时间：</label></Col>
                                    <Col span={3}>
                                        <FormItem hasFeedback={false}>
                                            {getFieldDecorator('delayDay', {
                                                rules: [{
                                                    required: true, message: '策略名称不能为空！',
                                                }],
                                                initialValue: 0,
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={100}
                                                    style={{width: '90%'}}
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={1}>
                                        <span className="lh30">天</span>
                                    </Col>
                                    <Col span={3}>
                                        <FormItem>
                                            {getFieldDecorator('delayMinute', {
                                                rules: [{
                                                    required: true, message: '策略名称不能为空！',
                                                }],
                                                initialValue: 0,
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={100}
                                                    style={{width: '90%'}}
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={1}>
                                        <span className="lh30">分钟</span>
                                    </Col>
                                    <Col>
                                        <p className="payAttention">注：订单状态变更后的X天Y分钟</p>
                                    </Col>
                                </Row>
                                <FormItem {...formItemLayout} label="推送次数" hasFeedback={false}>
                                    {getFieldDecorator('pushTimes', {
                                        rules: [{
                                            required: true, message: '推送次数不能为空！',
                                        }],
                                    })(
                                        <Select
                                            style={{ width: 200 }}
                                            placeholder="请选择推送次数!"
                                            optionFilterProp="children"
                                            onChange={() => { console.log(); }}
                                            onFocus={() => { console.log(); }}
                                            onBlur={() => { console.log(); }}
                                        >
                                            {
                                                new Array(21).fill('a').map((item, i) => {
                                                    return (<Option value={(i).toString()} key={i} >{i === 0 ? '不限制' : i}</Option>);
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <Row className="marketingCategoryRow">
                                    <Col span={3} className="marketingCategoryLabel"><label>营销类别：</label></Col>
                                    <Col span={6}>
                                        <FormItem hasFeedback={false}>
                                            {getFieldDecorator('marketingCategory', {
                                                rules: [{
                                                    required: true, message: '营销类别不能为空',
                                                }],
                                            })(
                                                <Select
                                                    style={{ width: 200 }}
                                                    placeholder="请选择营销类别!"
                                                    optionFilterProp="children"
                                                    onChange={() => { console.log(); }}
                                                    onFocus={() => { console.log(); }}
                                                    onBlur={() => { console.log(); }}
                                                >
                                                    {
                                                        ['发券', '用券', '拉新', '商品(不拼团)', '商品(拼团)', '购买会员卡', '评价', '支付', '调查问卷', '活动'].map((item, i) => {
                                                            return (<Option value={(i).toString()} key={i} >{item}</Option>);
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={9}>
                                        <FormItem {...formItemLayout2} label="优惠券" hasFeedback={false}>
                                            {getFieldDecorator('coupon', {
                                                rules: [{
                                                    required: true, message: '策略名称不能为空！',
                                                }],
                                                initialValue: 0,
                                            })(
                                                <Input />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <MarketingModel form={this.props.form} />
                                <FormItem {...formItemLayout} label="责任人" hasFeedback={false}>
                                    {getFieldDecorator('owner', {
                                        rules: [{
                                            required: true, message: '策略名称不能为空！',
                                        }],
                                        initialValue: 'fanxuehui@58daojia.com',
                                    })(
                                        <Input disabled={true}/>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" onClick={() => console.log(22)}>创建策略</Button>
                                    <Button onClick={() => console.log(12)} style={{marginLeft: '10px'}}>取消</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div style={{ background: '#fff', padding: 24, display: 'none', minHeight: 280 }}>
                            <div className="greeting">
                                let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
                            </div>
                            <Button onClick={onDecrement}>-</Button>
                            <Button onClick={onIncrement}>+</Button>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </div>
        );
    }
  }

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export function mapStateToProps(state: StoreState) {
    return {
        enthusiasmLevel: state.list.enthusiasmLevel,
        name: state.list.languageName,
        formState: state.createOrderStrategy.formState,
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ChangeFieldType>) => bindActionCreators(
    {
        onChangeField: actions.changeField
    }, 
    dispatch
);

const WrappedRegistrationForm = Form.create({
    mapPropsToFields(props: any) {
        return {
            owner: {
                value: props.formState.owner.value,
            },
        };
    },
    onFieldsChange(props: any, fields: any) {
        props.onChangeField(fields);
    }
})(List as any);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm as any));
