import * as React from 'react';
import * as actions from '../../actions/list';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Layout, Table } from 'antd';
import { Form, Input, Row, Col, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Content } = Layout;
import './index.scss';
import cfg from './cfg';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    form?: any;
}

const columns = [{
    title: '策略ID',
    dataIndex: 'name',
    key: '1'
  }, {
    title: '策略名称',
    className: 'column-money',
    dataIndex: 'money',
    key: '2'
  }, {
    title: '策略状态',
    dataIndex: 'address',
    key: '3'
}, {
    title: '创建时间',
    dataIndex: 'address',
    key: '4'
}, {
    title: '有效时间',
    dataIndex: 'address',
    key: '5'
}, {
    title: '触发事件',
    dataIndex: 'address',
    key: '6'
}, {
    title: '营销方式',
    dataIndex: 'address',
    key: '7'
}, {
    title: '营销类型',
    dataIndex: 'address',
    key: '8'
}, {
    title: '推送人数',
    dataIndex: 'address',
    key: '9'
}, {
    title: '创建人邮箱',
    dataIndex: 'address',
    key: '10'
}, {
    title: '策略状态',
    dataIndex: 'address',
    key: '11',
    render: (text, record) => (
        <span>
          点击
        </span>
      ),
  }];
  
  const data = [{
    'strategyName': 'lxn页面挂件测试',
    'pkId': '243813584004464720',
    'marketingType': '支付',
    'pushAmount': 0,
    'effectiveTime': '2017-11-03 19:04:11',
    'dataReport': true,
    'invalidTime': '2017-11-06 19:04:12',
    'strategyTypeInt': 7,
    'strategyType': '页面挂件',
    'activityId': 0,
    'createrEmail': 'liuxiaonan@daojia.com',
    'marketingTypeInt': 7,
    'createTime': '2017-11-03 19:08:07',
    'marketingLimit': 0,
    'actionExpression': '7',
    'updateContent': '无',
    'strategyState': '未开始'
  }];

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

class List extends React.Component<Props, object> {
    constructor(props: Props, context: any) {
        super(props, context);
    }
    componentDidMount() {
        console.log('component');
        actions.decrementEnthusiasm();
    }
    handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
    }

    render() {
        const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 15 },
          };
        const { getFieldDecorator } = this.props.form;
        // 策略状态项
        let strategyStatus = cfg.strategyStatus;
        let strategyStatusChildren = strategyStatus.map((item) => {
            return <Option value={item.id} key={item.id}>{item.name}</Option>;
        });
        // 营销类型
        let marketingType = cfg.marketingType;
        let marketingTypeChildren = marketingType.map((item) => {
            return <Option value={item.id} key={item.id}>{item.name}</Option>;
        });
        return (
            <Layout>
                <Header className="list-head">
                    营销管理平台
                    <Button style={{ marginLeft: '10px' }}>新增策略</Button>
                </Header>
                <Layout>
                    <Content className="content-wrap">
                        <div className="search-box">
                            <Form layout={'inline'} className="form-box">
                                <Row gutter={50} style={{ margin: '20px' }}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略ID" {...formItemLayout} >
                                            {/* <Input placeholder="请输入策略ID" /> */}
                                            {getFieldDecorator('number', {
                                                rules: [{ type: 'number' }],
                                            })(
                                                <Input placeholder="请输入策略ID" maxLength="30"/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="活动ID" {...formItemLayout} >
                                            <Input placeholder="请输入活动ID" maxLength="30"/>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略名称" {...formItemLayout} >
                                            <Input placeholder="请输入策略名称" />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={50} style={{ margin: '20px' }}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略状态" {...formItemLayout} >
                                            <Select placeholder="请选择" style={{ width: 120 }}>
                                                {strategyStatusChildren}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="开始时间" {...formItemLayout} >
                                            <Input placeholder="请输入活动ID" />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={50} style={{ margin: '20px' }}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="触发事件" {...formItemLayout} >
                                            <Select placeholder="请选择" style={{ width: 120 }}>
                                                <Option value="china">China</Option>
                                                <Option value="use">U.S.A</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="营销类型" {...formItemLayout} >
                                            <Select placeholder="请选择" style={{ width: 120 }}>
                                                {/* <Option value="china">China</Option>
                                                <Option value="use">U.S.A</Option> */}
                                                {marketingTypeChildren}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem {...formItemLayout} >
                                            <Button type="primary">查询</Button>
                                            <Button >重置</Button> 
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>                   
                        <div className="list">
                            <div className="greeting">
                                let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
                            </div>
                            <Button onClick={onDecrement}>-</Button>
                            <Button onClick={onIncrement}>+</Button>
                        </div>

                        <Table style={{background: '#fff'}} columns={columns} dataSource={data} bordered />
                    </Content>
                </Layout>
            </Layout>

        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(List as any);

export function mapStateToProps(state: StoreState) {
    return {
        enthusiasmLevel: state.list.enthusiasmLevel,
        name: state.list.languageName,
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>) => bindActionCreators(
    {
        onIncrement: actions.incrementEnthusiasm,
        onDecrement: actions.decrementEnthusiasm
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAdvancedSearchForm as any));
