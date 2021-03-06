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
    showOrderDetailCheck: number;
    onChange: (value: any) => void;
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

class DetailMarketingModel extends React.Component<DetailRuleProps, {}> {
    state: any = {
        showData: {},
        weChatPush: {},
        showOrderDetailCheck: 0,
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
        console.log('111' + JSON.stringify(value));
        this.props.onChange(value);

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
                    label = '58到家公众号-' + itemObj.tstate;
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
                            msg = <Col ><span style={{ fontWeight: 'bold' }}>{last}文案:</span> {itemObj[lb]}</Col>;
                            break;
                        case 'title':
                            msg = <Col><span style={{ fontWeight: 'bold' }}>{last} 标题: </span>{itemObj[lb]}</Col>;
                            break;
                        case 'link':
                            msg = <Col><span style={{ fontWeight: 'bold' }}>{last} 链接: </span>{itemObj[lb]}</Col>;
                            break;
                        case 'chat':
                            msg = <Col><span style={{ fontWeight: 'bold' }}>{last} 微信公众号:</span> {itemObj[lb]}</Col>;
                            break;
                        case 'first':
                            msg = <Col><span style={{ fontWeight: 'bold' }}>{last} 首端:</span> {itemObj[lb]}</Col>;
                            break;
                        case 'remark':
                            msg = <Col> <span style={{ fontWeight: 'bold' }}>{last} 尾端:</span> {itemObj[lb]}</Col>;
                            break;
                        case 'imgUrl':
                            msg = <Col><span style={{ fontWeight: 'bold' }}>{last} 图标:</span> {itemObj[lb]}</Col>;
                            break;
                        case 'animation':
                            msg = <Col> <span style={{ fontWeight: 'bold' }}> {last} 动画:</span> {itemObj[lb]}</Col>;
                            break;
                        case 'position':
                            msg = <Col> <span style={{ fontWeight: 'bold' }}> {last} 位置: </span>{itemObj[lb]}</Col>;
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
                        {/* style={{ margin: '0 0 0 86px' }} */}
                        <Row>
                            {properties}
                        </Row>
                    </div>
                );
            } else {
                return (
                    <div key={i}>
                        <Row >
                            <Col span={2} style={{ fontWeight: 'bold', color: '#2b2b2b' }}>渠道{i + 1}</Col>
                            <Col span={5} style={{ color: '#462bc3', fontWeight: 'bold' }}>{label}</Col>
                        </Row>
                        {/* style={{ margin: '0 0 0 86px' }} */}
                        <Row>
                            {properties}
                        </Row>
                    </div>
                );
            }

        });
    }
    render() {
        // edit==true 为修改页面
        const { page, value, stage, showOrderDetailCheck } = this.props;
        const { weChatPush, showData } = this.state;

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
                        stage={stage}
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
