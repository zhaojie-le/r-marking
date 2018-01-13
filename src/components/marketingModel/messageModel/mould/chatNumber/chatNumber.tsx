import * as React from 'react';
import './style.scss';
import {
    Input,
    Row,
    Col,
    Checkbox
} from 'antd';
import withOperator from '../mouldOperate';

interface ChatNumberProp {
    key: number;
    showOrderDetailCheck?: boolean;
    value: any;
    stage?: number;
    onChange: (value: any) => any;
}

class ChatNumber extends React.Component<ChatNumberProp, {}> {
    state = {
        linkInput: false,
        first: '',
        remark: '',
        link: '',
        type: 4,
        showOrderDetailCheck: false,
    };
    private detailLink: string = '订单详情页';
 
    constructor(props: any, context: any) {
        super(props, context);
        const value = this.props.value || {};
        this.state = { ...value, type: 4, showOrderDetailCheck: this.props.showOrderDetailCheck};
    }
    
    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ ...value, showOrderDetailCheck: nextProps.showOrderDetailCheck });
        }
    }

    firstChange = (event) => {
        const first = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ first });
        }
        this.triggerChange({ first });
    }

    remarkChange = (event) => {
        const remark = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ remark });
        }
        this.triggerChange({ remark });
    }

    linkChange = (event) => {
        const isLinkInputDs = event.target.checked;
        const link = event.target.checked ? this.detailLink : event.target.value;
        if (!('value' in this.props)) {
            this.setState({ 
                link: link, 
                linkInput: isLinkInputDs, 
            });
        }
        this.triggerChange({ link, linkInput: isLinkInputDs });
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
              onChange(Object.assign({}, this.state, changedValue));
        }
    }

    isHourEmploee = () => {
        let { linkInput, link } = this.state;
        const { stage } = this.props;
        const hasChecked = link === this.detailLink ? true : false;
        linkInput = stage ? true : linkInput;

        return (
            <div>
                {this.state.showOrderDetailCheck ? <Checkbox onChange={this.linkChange} disabled={!!stage} checked={hasChecked}>该订单详情页</Checkbox> : null}
                <Input placeholder="请输入跳转链接!" onChange={this.linkChange} disabled={linkInput} defaultValue={hasChecked ? '' : link}/>
            </div>
        );
    }

    render() {
        const { docs }: any = this.state;

        return (
            <div className="daojiaAppModel">
                <Row>
                    <Col span={20} offset={5}  style={{ background: '#fff', padding: 10, border: '1px solid #ccc' }}>
                        <h2>下单成功通知</h2>
                        <Row>
                            <Col span={3}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 首段</Col>
                            <Col span={20} offset={1}><Input placeholder="请输入标题!" onChange={this.firstChange} defaultValue={docs}/></Col>
                        </Row>
                        {
                            this.props.children
                        }
                        <Row>
                            <Col span={3}><i style={{color: 'red'}}>*</i> 尾段</Col>
                            <Col span={20} offset={1}><Input placeholder="请输入标题!" onChange={this.remarkChange} defaultValue={docs}/></Col>
                        </Row>
                    </Col>
                </Row>
                <Row><Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 跳转链接:</Col><Col span={19}>{this.isHourEmploee()}</Col></Row>
                <Row><Col span={19} offset={5} style={{lineHeight: '16px', color: '#2a52be'}}>系统自动加入hmsr参数，无需手动填写 .hmsr=wxgzh_clyx_策略id_策略类别_活动id（活动id只有发券类型才有）</Col></Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({title: '58到家公众号'})(ChatNumber);
export default OUTPUT;