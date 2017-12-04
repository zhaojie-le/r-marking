import * as React from 'react';
import './style.scss';
import { 
    Form,
    Button,
    Menu,
    Dropdown,
    Icon,
} from 'antd';
import { ChatNumber, DaojiaAppModel, Sms, SuyunAppModel } from './mould';

const FormItem = Form.Item;

export interface RuleProps {
    form?: any;
    value?: any;
    stage: number;
    onChange: (value: any) => void;
}
let uuid = 0;
namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
    };
    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
    };
    export const modelItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 3 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
    };
}

enum ChannelType {
    Sms = 1,
    DaojiaApp,
    SuyunApp,
    ChatNumber,
}

export default class MarketingModel extends React.Component<RuleProps, {}> {
    state: any = {
        editing: false,
        showData: {},
        channelType: [[1, '短信'], [2, '58到家-APP push'], [3, '58速运-APP push'], [4, '58到家公众号']],
    };

    constructor(props: any, context: any) {
        super(props, context);
        const value = this.props.value || [];
        let channelType = this.state.channelType;

        this.state.models = value.map((item) => {
            channelType = channelType.filter((channel) => {
                return channel[0] !== parseInt(item.type, 10);
            });
            return {
                ...item,
                k: uuid++
            };
        });
        this.state.channelType = channelType;
    }

    onEdit = (isEditing) => {
        this.setState({
            editing: isEditing
        });
    }

    onSave = () => {
        const fields: any[] = [];
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        keys.forEach((item, i) => {
            switch (parseInt(item.type, 10)) {
                case ChannelType.Sms:
                    fields.push(`sms-${item.k}`);
                    break;
                case ChannelType.DaojiaApp:
                    fields.push(`daojiaApp-${item.k}`);
                    break;
                case ChannelType.SuyunApp:
                    fields.push(`suyunApp-${item.k}`);
                    break;
                case ChannelType.ChatNumber:
                    fields.push(`chatNumber-${item.k}`);
                    break;      
                default:
                    break;
            }
        });
        this.props.form.validateFields(fields, (err, values) => {
            if (!err) {
                this.setState({showData: values});
                this.onEdit(false);
                this.props.onChange(values);
            }
        });
    }

    _changeChannelType = (type) => {
        const newChannelType = this.state.channelType.filter((item) => {
            return item[0] !== parseInt(type, 10);
        });
        this.setState({
            channelType: newChannelType
        });
    }

    handleMenuClick = (e) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat({k: uuid++, type: e.key, value: {type: e.key}});
        form.setFieldsValue({
            keys: nextKeys,
        });
        this._changeChannelType(e.key);
    }
 
    shiftUp = (key) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = [ ...keys ];
        const current = nextKeys.indexOf(key);
        const preIndex = current - 1;
        const help = nextKeys[preIndex];
        nextKeys[preIndex] = key;
        nextKeys[current] = help;
        nextKeys[preIndex].k = uuid++;
        nextKeys[current].k = uuid++;

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    shiftDown = (key) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = [ ...keys ];
        const current = nextKeys.indexOf(key);
        const preIndex = current + 1;
        const help = nextKeys[preIndex];

        nextKeys[preIndex] = key;
        nextKeys[current] = help;
        nextKeys[preIndex].k = uuid++;
        nextKeys[current].k = uuid++;

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    deleteChannel = (dlkey, label) => {
        const { type } = dlkey;
        const newChannelType = [...this.state.channelType, [parseInt(type, 10), label]];
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
    
        form.setFieldsValue({
            keys: keys.filter(key => key !== dlkey),
        });
        this.setState({
            channelType: newChannelType
        });
    }

    onModelFieldChange = (value) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const newKeys = keys.map((item) => {
            const newValue = value.type === item.type ? value : item.value;
            return { ...item, value: newValue };
        });
        
        form.setFieldsValue({
            keys: newKeys,
        });
    }
    
    checkSms = (rule, value, callback) => {
        if (value.docs && value.link) {
            callback();
            return;
        }
        callback('请正确填写短信营销方式所有字段!');
    }

    checkApp = (rule, value, callback) => {
        if (value.docs && value.link && value.title) {
            callback();
            return;
        }
        callback('请填全到家App营销方式字段!');
    }

    checkChatNumber = (rule, value, callback) => {
        if (value.docs && value.link) {
            callback();
            return;
        }
        callback('请填全58公众号营销方式字段!');
    }

    geteratorChannel = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { stage } = this.props;
        const models = this.state.models.map((item) => {
            return {
                ...item,
                k: uuid++
            };
        });
        getFieldDecorator('keys', { initialValue: models });
        const keys = getFieldValue('keys');
        const clength = keys.length;
        
        return keys.map((key, i) => {
            const props = {
                first:  i === 0 ? true : false,
                last: i === clength - 1 ? true : false,
                stage: stage,
                onShiftUp: () => this.shiftUp(key), 
                onShiftDown: () => this.shiftDown(key)
            };
            const typeIndex = i + 1;
            const {k, type} = key;

            switch (parseInt(type, 10)) {
                case ChannelType.Sms:
                    return (
                        <FormItem {...layout.modelItemLayout} label={`渠道${typeIndex}`} key={typeIndex}>
                            {getFieldDecorator(`sms-${k}`, {
                                initialValue: key.value,
                                rules: [{
                                    required: true, message: '短信渠道信息字段不能为空！',
                                    validator: this.checkSms
                                }],
                            })(
                                <Sms 
                                    onChange={this.onModelFieldChange} 
                                    {...props}
                                    onDelete={() => this.deleteChannel(key, '短信')}
                                />
                            )}
                        </FormItem>
                    );
                case ChannelType.DaojiaApp:
                    return (
                        <FormItem {...layout.modelItemLayout} label={`渠道${typeIndex}`} key={typeIndex}>
                            {getFieldDecorator(`daojiaApp-${k}`, {
                                initialValue: key.value,
                                rules: [{
                                    required: true, message: '到家App渠道字段不能为空！',
                                    validator: this.checkApp
                                }],
                            })(
                                <DaojiaAppModel 
                                    onChange={this.onModelFieldChange} 
                                    {...props}
                                    onDelete={() => this.deleteChannel(key, '58到家-APP push')}
                                />
                            )}
                        </FormItem>
                    );
                case ChannelType.SuyunApp:
                    return (
                        <FormItem {...layout.modelItemLayout} label={`渠道${typeIndex}`} key={typeIndex}>
                            {getFieldDecorator(`suyunApp-${k}`, {
                                initialValue: key.value,
                                rules: [{
                                    required: true, message: '速运APP渠道字段不能为空！',
                                    validator: this.checkApp
                                }],
                            })(
                                <SuyunAppModel 
                                    onChange={this.onModelFieldChange} 
                                    {...props}
                                    onDelete={() => this.deleteChannel(key, '58速运-APP push')}
                                />
                            )}
                        </FormItem>
                    );
                case ChannelType.ChatNumber:
                    return (
                        <FormItem {...layout.modelItemLayout} label={`渠道${typeIndex}`} key={typeIndex}>
                            {getFieldDecorator(`chatNumber-${k}`, {
                                initialValue: key.value,
                                rules: [{
                                    required: true, message: '58到家公众号渠道字段不能为空！',
                                    validator: this.checkChatNumber
                                }],
                            })(
                                <ChatNumber 
                                    onChange={this.onModelFieldChange} 
                                    {...props}
                                    onDelete={() => this.deleteChannel(key, '58到家公众号')}
                                />
                            )}
                        </FormItem>
                    );
                default:
                    return (<div>not find this type</div>);
            }
        });
    }

    generatorCreateMenu = () => {
        console.log(this.state.channelType);
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

    generateShowData = () => {
        const { showData } = this.state;
        return Object.keys(showData).map((item: string, i: number) => {
            let label: any, properties: any[];
            const itemObj = showData[item];
            switch (item.split('-')[0].toUpperCase()) {
                case ChannelType[1].toUpperCase():
                    label = '短信';
                    break;
                case ChannelType[2].toUpperCase():
                    label = '58到家-APP push';
                    break;
                case ChannelType[3].toUpperCase():
                    label = '58速运-APP push';
                    break;
                case ChannelType[4].toUpperCase():
                    label = '58到家公众号';
                    break;      
                default:
                    break;
            }

            properties = Object.keys(itemObj).reduce(
                (last, lb, index, arr): any => {
                    let msg: string = '';
                    switch (lb) {
                        case 'docs':
                            msg = `${last} 文案: ${itemObj[lb]},`;
                            break;
                        case 'title':
                            msg =  `${last} 标题: ${itemObj[lb]},`;
                            break;
                        case 'link':
                            msg =  `${last} 链接: ${itemObj[lb]},`;
                            break;
                        case 'chat':
                            msg = `${last} 微信公众号: ${itemObj[lb]},`; 
                            break; 
                        default:
                            msg = last;
                            break;
                    }
                    
                    return index === arr.length - 1 ? msg.substring(0, msg.length - 1) : msg;
                }, 
                ':'
            );

            return (
                <p key={i}>
                    <span>渠道{i + 1}</span>
                    <span>{label}</span>
                    <span>{properties}</span>
                </p>
            );
        });
    }

    getContentTpl = () => {
        const tpl = this.state.editing 
        ? (
            <div className="wrapperModel">
                {this.geteratorChannel()}
                {this.generatorCreateMenu()}
                <FormItem {...layout.tailFormItemLayout}>
                    <Button type="primary" onClick={this.onSave}>保存</Button>
                    <Button onClick={() => this.onEdit(false)} style={{marginLeft: '10px'}}>取消</Button>
                </FormItem>
            </div>
        ) 
        : (
            <div className="wrapperModel">
                <p><span style={{color: 'red'}}>消息推送</span> 优先级：渠道1>渠道2>渠道3 优先渠道送达后，其他渠道将不再推送</p>
                {this.generateShowData()}
            </div>
        );

        return tpl;
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
