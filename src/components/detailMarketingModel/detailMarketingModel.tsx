import * as React from 'react';
import {
    Row,
    Col
} from 'antd';
import { MarketingModel, LoadElement, PageHanger } from '../../components';

interface DetailRuleProps {
    form?: any;
    value?: any;
    stage: number;
    page: boolean;
}

enum ChannelType {
    Sms = 1,
    DaojiaApp,
    SuyunApp,
    ChatNumber,
    PayAppoint, // 支付预约
    PagePendant, // 页面挂件
    homeOperation, // 首页运营位
}

// 短信  { type: '1', docs: '111', link: '222' }
// 58到家-APP push  { type: '2', docs: '111', link: '222', title: '22222' }
// 58速运-APP push  {文案、标题、跳转链接}
// 储存券 {标题、文案、跳转链接}
// 导出用户{标题、文案、跳转链接}
// 58到家公众号 {首端、尾端、跳转链接} 
// 外推消息{首段、尾段、*跳转链接} 没有加数字
// 支付预约的页面{图标、文案、链接}
// 首页运营位{图标、链接}
// 页面挂件{图标、链接、动画、位置}
class DetailMarketingModel extends React.Component<DetailRuleProps, {}> {
    state: any = {
        showData: {},
        weChatPush: {},
        showOrderDetailCheck: false,
        channelType: [[1, '短信'], [2, '58到家-APP push'], [3, '58速运-APP push'], [4, '58到家公众号'], [5, '支付预约'], [6, '页面挂件'], [7, '首页运营位']],
    };
    constructor(props: DetailRuleProps, context: any) {
        super(props, context);
        const value = this.props.value || [];
        console.log('valuevaluevalue=' + JSON.stringify(value));
        value.forEach((item) => {
            let trItem: any;
            switch (item.type) {
                case '1':
                    this.state.showData.sms = item.value;
                    break;
                case '2':
                    this.state.showData.daojiaApp = item.value;
                    break;
                case '3':
                    this.state.showData.suyunApp = item.value;
                    break;
                case '4':
                    this.state.showData.chatNumber = item.value;
                    break;
                case '5':
                    this.state.showData.PayAppoint = item.value;
                    break;
                case '6':
                    this.state.showData.PagePendant = item.value;
                    break;
                case '7':
                    this.state.showData.homeOperation = item.value;
                    break;
                default:
                    break;
            }
            return trItem;
        });

    }
    onMarketingModelChange = (value) => {
        console.log(value);
    }
    generateShowData() {
        const { showData } = this.state;
        console.log('valuevalue=' + JSON.stringify(showData));
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
                case ChannelType[5].toUpperCase():
                    label = '支付预约的页面';
                    break;
                case ChannelType[6].toUpperCase():
                    label = '页面挂件';
                    break;
                case ChannelType[7].toUpperCase():
                    label = '首页运营位';
                    break;
                default:
                    break;
            }

            properties = Object.keys(itemObj).reduce(
                (last, lb, index, arr): any => {
                    let msg: any;
                    switch (lb) {
                        case 'docs':
                            msg = <Col>{last} 文案: {itemObj[lb]}</Col>;
                            break;
                        case 'title':
                            msg = <Col>{last} 标题: {itemObj[lb]}</Col>;
                            break;
                        case 'link':
                            msg = <Col>{last} 链接: {itemObj[lb]}</Col>;
                            break;
                        case 'chat':
                            msg = <Col>{last} 微信公众号: {itemObj[lb]}</Col>;
                            break;
                        case 'firparagraph':
                            msg = <Col>{last} 首端: {itemObj[lb]}</Col>;
                            break;
                        case 'lastparagraph':
                            msg = <Col> {last} 尾端: {itemObj[lb]}</Col>;
                            break;
                        case 'imgUrl':
                            msg = <Col>{last} 图标: {itemObj[lb]}</Col>;
                            break;
                        case 'animation':
                            msg = <Col>{last} 动画: {itemObj[lb]}</Col>;
                            break;
                        case 'position':
                            msg = <Col>{last} 位置: {itemObj[lb]}</Col>;
                            break;
                        default:
                            msg = last;
                            break;
                    }
                    return msg;
                },
                ''
            );
            if (label === '支付预约的页面' || label === '页面挂件' || label === '首页运营位') {
                return (
                    <div key={i}>
                        <Row >
                            <Col span={5} style={{ color: '#462bc3' }}>{label}</Col>
                        </Row>
                        <Row style={{ margin: '0 0 0 76px' }}>
                            {properties}
                        </Row>
                    </div>
                );
            } else {
                return (
                    <div key={i}>
                        <Row >
                            <Col span={2} style={{ fontWeight: 'bold', color: '#2b2b2b' }}>渠道{i + 1}</Col>
                            <Col span={5} style={{ color: '#462bc3' }}>{label}</Col>
                        </Row>
                        <Row style={{ margin: '0 0 0 76px' }}>
                            {properties}
                        </Row>
                    </div>
                );
            }

        });
    }
    render() {
        // edit==true 为修改页面
        const { page, value } = this.props;
        const { showOrderDetailCheck, weChatPush, showData } = this.state;
        console.log('valuevaluepagepagepage===' + JSON.stringify(value[0].value));
        if (page === true) {
            return (
                <div className="wrapperModel">
                    {this.generateShowData()}
                </div>
            );
        } else {
            if (showData.PagePendant !== undefined) {
                // {link: '', imgUrl: '',animation:'',position:''}
                return (
                    <PageHanger
                        form={this.props.form}
                        value={value[0].value}
                        onChange={this.onMarketingModelChange}
                    />

                );
            } else if (showData.PayAppoint !== undefined) {
                return (
                    <LoadElement
                        form={this.props.form}
                        value={{ imgUrl: '11', docs: '111', link: '111' }}
                        onChange={this.onMarketingModelChange}
                    />
                );
            } else {
                return (
                    <MarketingModel
                        form={this.props.form}
                        stage={0}
                        option={weChatPush}
                        value={value}
                        showOrderDetailCheck={showOrderDetailCheck}
                        onChange={this.onMarketingModelChange}
                    />
                );
            }
        }
    }
}

export default DetailMarketingModel;
