import * as React from 'react';
import './style.scss';
import {
    Input,
    Checkbox,
    Row,
    Col,
} from 'antd';
import withOperator from '../mouldOperate';

interface DaojiaProp {
    value?: any;
    stage?: number;
    showOrderDetailCheck?: boolean;
    onChange: (value: any) => any;
}

class DaojiaAppModel extends React.Component<DaojiaProp, {}> {
    state = {
        linkInput: false,
        docs: '',
        link: '',
        title: '',
        type: 2,
        showOrderDetailCheck: false,
    };
    private detailLink: string = 'xxx';
 
    constructor(props: any, context: any) {
        super(props, context);
        const value = this.props.value || {};
        this.state = { ...value, type: 2, showOrderDetailCheck: this.props.showOrderDetailCheck };
    }
    
    componentWillReceiveProps(nextProps: any) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ ...value, showOrderDetailCheck: nextProps.showOrderDetailCheck });
        }
    }

    wnChange = (event) => {
        const docs = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ docs });
        }
        this.triggerChange({ docs });
    }

    ttChange = (event) => {
        const title = event.target.value;
        if (!('value' in this.props)) {
            this.setState({ title });
        }
        this.triggerChange({ title });
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
        const { docs, title }: any = this.state;

        return (
            <div className="daojiaAppModel">
                <Row><Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 标题:</Col><Col span={19}><Input placeholder="请输入标题!" onChange={this.ttChange} defaultValue={title}/></Col></Row>
                <Row><Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 文案:</Col><Col span={19}><Input placeholder="请输入文案!" onChange={this.wnChange} defaultValue={docs}/></Col></Row>
                <Row><Col span={5}><i style={{color: 'red', fontStyle: 'normal'}}>*</i> 跳转链接:</Col><Col span={19}>{this.isHourEmploee()}</Col></Row>
                <Row><Col span={19} offset={5} style={{lineHeight: '16px', color: '#2a52be'}}>系统自动加入hmsr参数，无需手动填写hmsr=daojia_clyx_策略id_策略类别_活动id（活动id只有发券类型才有）</Col></Row>
            </div>
        );
    }
}

const OUTPUT = withOperator({title: '58到家App push'})(DaojiaAppModel);
export default OUTPUT;