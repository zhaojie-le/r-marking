import * as React from 'react';
import './style.scss';
import { 
    Form,
    Input,
    Row,
    Col,
    Button,
    Menu,
    Dropdown,
    Icon,
} from 'antd';

const FormItem = Form.Item;

export interface RuleProps {
    form?: any;
}

namespace layout {
    export const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
    };
    export const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 19, offset: 5, }, },
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
        channels: [],
        channelType: [[1, '短信'], [2, '58到家-APP push'], [3, '58到家-APP push'], [4, '58到家公众号']],
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
        const newChannel = [...this.state.channels, parseInt(e.key, 10)];
        const newChannelType = this.state.channelType.filter((item) => {
            return item[0] !== parseInt(e.key, 10);
        });
        this.setState({
            channels: newChannel,
            channelType: newChannelType
        });
    }
 
    shiftUp = (index, label) => {
        const idx = this.state.channels.indexOf(index);
        const newChannel = this.state.channels.fill(this.state.channels[idx - 1], idx, idx + 1).fill(index, idx - 1, idx);
        this.setState({
            channels: newChannel
        });
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
        const rowStyle = {
            marginBottom: 20
        };
        
        return this.state.channels.map((item, i) => {
            const index = i + 1;
            switch (item) {
                case ChannelType.Sms:
                    return (
                        <div key={i}>
                            <Row style={rowStyle}>
                                <Col span={3} style={{fontSize: 14, fontWeight: 'bold'}}>渠道{index}</Col>
                                <Col span={4}>短信</Col>
                                <Col span={3}>
                                    <Button onClick={() => this.shiftUp(1, '短信')}>上移</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.deleteChannel(1, '短信')}>删除</Button>
                                </Col>
                            </Row>
                            <FormItem {...layout.formItemLayout} label="文案" hasFeedback={false}>
                                {getFieldDecorator('copyWriting', {
                                    rules: [{
                                        required: true, message: '文案不能为空！',
                                    }],
                                })(
                                    <Input placeholder="请输入文案!"/>
                                )}
                            </FormItem>
                            <FormItem {...layout.formItemLayout} label="跳转链接" hasFeedback={false}>
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
                case ChannelType.DaojiaApp:
                    return (
                        <div key={i}>
                            <Row style={rowStyle}>
                                <Col span={3} style={{fontSize: 14, fontWeight: 'bold'}}>渠道{index}</Col>
                                <Col span={4}>58到家-APP push</Col>
                                <Col span={3}>
                                    <Button onClick={() => this.shiftUp(2, '58到家-APP push')}>上移</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.deleteChannel(2, '58到家-APP push')}>删除</Button>
                                </Col>
                            </Row>
                            <FormItem {...layout.formItemLayout} label="标题" hasFeedback={false}>
                                {getFieldDecorator('channelTile', {
                                    rules: [{
                                        required: true, message: '标题不能为空！',
                                    }],
                                })(
                                    <Input placeholder="请输入标题!"/>
                                )}
                            </FormItem>
                            <FormItem {...layout.formItemLayout} label="文案" hasFeedback={false}>
                                {getFieldDecorator('copyWriting', {
                                    rules: [{
                                        required: true, message: '文案不能为空！',
                                    }],
                                })(
                                    <Input placeholder="请输入文案!"/>
                                )}
                            </FormItem>
                            <FormItem {...layout.formItemLayout} label="跳转链接" hasFeedback={false}>
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
                case ChannelType.SuyunApp:
                    return (<div key={i}>3</div>);
                case ChannelType.ChatNumber:
                    return (<div key={i}>4</div>);
                default:
                    return (<div>not find this type</div>);
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
        if (this.state.editing) {
            return (
                <div>
                    {this.geteratorChannel()}
                    {this.generatorCreateMenu()}
                    <FormItem {...layout.tailFormItemLayout}>
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
