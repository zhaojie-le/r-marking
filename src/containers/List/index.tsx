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
    listData: any;
    totalInfo: number;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    strategyList?: () => void;
    form?: any;
}

const columns = [{
    title: '策略ID',
    dataIndex: 'pkId',
    key: 'pkId'
  }, {
    title: '策略名称',
    dataIndex: 'strategyName',
    key: 'strategyName'
  }, {
    title: '策略状态',
    dataIndex: 'strategyState',
    key: 'strategyState'
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
}, {
    title: '有效时间',
    dataIndex: 'effectiveTime',
    key: 'effectiveTime'
}, {
    title: '失效时间',
    dataIndex: 'invalidTime',
    key: 'invalidTime'
}, {
    title: '触发事件',
    dataIndex: 'marketingTypeInt',
    key: 'marketingTypeInt'
}, {
    title: '营销方式',
    dataIndex: 'address',
    key: '7'
}, {
    title: '营销类型',
    dataIndex: 'marketingType',
    key: 'marketingType'
}, {
    title: '推送人数',
    dataIndex: 'pushAmount',
    key: 'pushAmount'
}, {
    title: '创建人邮箱',
    dataIndex: 'createrEmail',
    key: 'createrEmail'
}, {
    title: '操作',
    dataIndex: 'dataReport',
    key: 'dataReport',
    render: (text, record) => (
        <Button>点击</Button>
      ),
  }];
//   const data = [{
//     'showEdit': true,                        //是否显示修改按钮
//     'strategyName': 'lxn页面挂件测试',         // 策略名称
//     'pkId': '243813584004464720',            // 策略id
//     'marketingType': '支付',                  // 营销类型
//     'pushAmount': 0,                         // 推送人数
//     'effectiveTime': '2017-11-03 19:04:11',  // 生效时间
//     'dataReport': true,
//     'invalidTime': '2017-11-06 19:04:12',    // 失效时间
//     'strategyTypeInt': 7,               
//     'strategyType': '页面挂件',               // 触发事件  
//     'activityId': 0,
//     'createrEmail': 'liuxiaonan@daojia.com', // 创建者邮箱
//     'marketingTypeInt': 7,
//     'createTime': '2017-11-03 19:08:07',     // 创建时间
//     'marketingLimit': 0,
//     'actionExpression': '7',
//     'updateContent': '无',
//     'strategyState': '未开始'                 // 策略状态
//   }];

// 对获取的值进一步处理
function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

class List extends React.Component<Props, object> {
    constructor(props: Props, context: any) {
        super(props, context);
    }
    componentDidMount() {
        const { strategyList = () => {}} = this.props;
        console.log('component');
        strategyList();

        this.props.form.validateFields();
    }
    // 搜索清空
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { listData, name, enthusiasmLevel = 1, onIncrement = () => {}, onDecrement = () => {} } = this.props;
        // 设置表单的排列间隙
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 15 },
        };
        // 添加input自动校验
        // const { getFieldDecorator } = this.props.form;
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
                            <Form layout={'inline'} className="form-box" onSubmit={this.handleSearch}>
                                <Row gutter={50} style={{ margin: '20px' }}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略ID" {...formItemLayout} >
                                            <Input placeholder="请输入策略ID" maxLength="30"/>
                                            {/* {getFieldDecorator('number', {
                                                rules: [{ type: 'number' }],
                                            })(
                                                <Input placeholder="请输入策略ID" maxLength="30"/>
                                            )} */}
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
                                            <Button type="primary" htmlType="submit">查询</Button>
                                            <Button onClick={this.handleReset}>重置</Button> 
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>                   
                        <div className="list">
                            <div className="greeting">
                                let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
                            </div>
                            <Button onClick={() => { onDecrement(); }}>-</Button>
                            <Button onClick={onIncrement}>+</Button>
                        </div>

                        <Table style={{background: '#fff'}} columns={columns} dataSource={listData} bordered/>
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
        listData: state.list.listData
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>) => bindActionCreators(
    {
        onIncrement: actions.incrementEnthusiasm,
        onDecrement: actions.decrementEnthusiasm,
        strategyList: actions.StrategyList
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAdvancedSearchForm as any));
