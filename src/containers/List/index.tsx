import * as React from 'react';
import * as actions from '../../actions/list';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Layout, Table, DatePicker } from 'antd';
import { Form, Input, Row, Col, Select, Pagination } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Content } = Layout;
const { RangePicker } = DatePicker;
import './index.scss';
import cfg from './cfg';

export interface Props {
    name: string;
    listData: any;
    totalInfo: number;
    page: number;            // 发送请求页数
    pageSize: number;        // 每页列表条数
    pkId: string;            // 策略ID
    activityId: string;      // 活动ID
    strategyName: string;    // 策略名称
    strategyState: string;   // 策略状态
    effectiveTime: string;   // 起始时间
    invalidTime: string;     // 结束时间
    strategyType: number;    // 触发事件
    marketingType: number;   // 营销类型
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    strategyList?: () => void;
    form?: any;
    params?: any;
}
// 表格头部设置参数
const columns = [{
    title: '策略ID',
    dataIndex: 'pkId',
    key: 'pkId',
    // 跳转连接方式
    render: text => <a href="https://bj.daojia.com/">{text}</a>,
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
        <Button size='small'>点击</Button>
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

class List extends React.Component<Props, object> {
    // 组件内部变量
    // state = {
    //     page:0
    // }
    constructor(props: Props, context: any) {
        super(props, context);
    }
    componentDidMount() {
        const { strategyList = () => {}} = this.props;
        console.log('component');
        strategyList();

        this.props.form.validateFields();
    }

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    // 输入框赋值,策略id
    pkIdChange = (e) => {
        e.target.value = this.limitNumberInput(e.target.value);   
        this.props.params.pkId = e.target.value;
        console.log('this.props.params', this.props.params);
    }
    // 输入框赋值,活动id
    activityIdChange = (e) => {
        e.target.value = this.limitNumberInput(e.target.value);
        this.props.params.activityId = e.target.value;
    }
    // 输入框赋值,策略名称
    strategyNameChange = (e) => {
        e.target.value = this.limitNumberInput(e.target.value);
        this.props.params.strategyName = e.target.value;
    }
    // 输入框赋值,策略状态
    strategyStatusChange = (value) => {
        // console.log(`selected ${value}`);
        this.props.params.strategyState = `${value}`;
    }
    // 输入框赋值,营销类型
    marketingTypeChange = (value) => {
        this.props.params.marketingType = `${value}`;
    }
    // 输入框，限制输入纯数字
    limitNumberInput = (n) => {
       return n = n.replace(/[^\d]/g, '');  
    }

    onDateChange = () => {

    }
    // 选择时间后，获取时间
    onTimeChange = (value,dateString) => {
        console.log('Selected Time: ', value); // 未转换格式
        console.log('Formatted Selected Time: ', dateString); // 转换后格式
        let dataArray = dateString
        if (dataArray.length > 0) {
            this.props.params.effectiveTime = dataArray[0];
            this.props.params.invalidTime = dataArray[1];
        }
    }
    // 点击查询按钮
    searchClick = () => {
        console.log(this.props.params)
    }

    // 搜索清空
    searchReset = () => {
        this.props.params.pageSize = 10,       // 每页列表数
        this.props.params.pkId = '',           // 策略ID
        this.props.params.activityId = '',     // 活动ID
        this.props.params.strategyName = '',   // 策略名称
        this.props.params.strategyState = '',  // 策略状态
        this.props.params.effectiveTime = '',  // 起始时间
        this.props.params.invalidTime = '',    // 结束时间
        this.props.params.strategyType = '',   // 触发事件
        this.props.params.marketingType = ''   // 营销类型
    }

    // 分页器
    pageChange = (page) => {
        this.props.params.page = page;
        console.log(this.props.params)
    }

    render() {
        const { listData, totalInfo } = this.props;
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
                                <Row gutter={24} style={{ margin: '20px' }}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略ID" {...formItemLayout} >
                                            <Input placeholder="请输入策略ID" maxLength="30" onChange={this.pkIdChange}/>
                                            {/* {getFieldDecorator('number', {
                                                rules: [{ type: 'number' }],
                                            })(
                                                <Input placeholder="请输入策略ID" maxLength="30"/>
                                            )} */}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="活动ID" {...formItemLayout} >
                                            <Input placeholder="请输入活动ID" maxLength="30" onChange={this.activityIdChange}/>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略名称" {...formItemLayout} >
                                            <Input placeholder="请输入策略名称" onChange={this.strategyNameChange}/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={24} style={{ margin: '20px' }}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略状态" {...formItemLayout} >
                                            <Select placeholder="请选择" style={{ width: 123 }} onChange={this.strategyStatusChange}>
                                                {strategyStatusChildren}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="触发事件" {...formItemLayout} >
                                            <Select placeholder="请选择" style={{ width: 123 }}>
                                                <Option value="china">China</Option>
                                                <Option value="use">U.S.A</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <FormItem label="营销类型" {...formItemLayout} >
                                            <Select placeholder="请选择" style={{ width: 123 }} onChange={this.marketingTypeChange}>
                                                {/* <Option value="china">China</Option>
                                                <Option value="use">U.S.A</Option> */}
                                                {marketingTypeChildren}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <FormItem label="策略时间" {...formItemLayout} >
                                            <RangePicker
                                                showTime={{ format: 'HH:mm' }}
                                                format="YYYY-MM-DD HH:mm"
                                                placeholder={['Start Time', 'End Time']}
                                                onChange={this.onTimeChange}
                                            />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <Button type="primary" onClick={this.searchClick}>查询</Button>
                                        <Button onClick={this.searchReset} style={{ marginLeft: '15px' }}>重置</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>                   
                        {/* <div className="list">
                            <div className="greeting">
                                let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
                            </div>
                            <Button onClick={() => { onDecrement(); }}>-</Button>
                            <Button onClick={onIncrement}>+</Button>
                        </div> */}
                        {/* 列表表格 */}
                        <div style={{background: '#fff'}}>
                            <Table style={{background: '#fff'}} columns={columns} dataSource={listData} bordered pagination={false}/>
                            <div style={{position: 'relative', height: '70px'}}>
                                <Pagination style={{position: 'absolute', right: '0', top: '18px'}} onChange={this.pageChange} defaultCurrent={1} total={totalInfo} />
                            </div>
                        </div>
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
        totalInfo: state.list.totalInfo,
        listData: state.list.listData,             // 列表数组
        page: state.list.page,                     // 发送请求页数
        pageSize: state.list.pageSize,             // 每页列表条数
        pkId: state.list.pkId,                     // 策略ID
        activityId: state.list.activityId,         // 活动ID
        strategyName: state.list.strategyName,     // 策略名称
        strategyState: state.list.strategyState,   // 策略状态
        effectiveTime: state.list.effectiveTime,   // 起始时间
        invalidTime: state.list.invalidTime,       // 结束时间
        strategyType: state.list.strategyType,     // 触发事件
        marketingType: state.list.marketingType,   // 营销类型
        params: {
            page: 1,            // 翻页值
            pageSize: 10,       // 每页列表数
            pkId: '',           // 策略ID
            activityId: '',     // 活动ID
            strategyName: '',   // 策略名称
            strategyState: '',  // 策略状态
            effectiveTime: '',  // 起始时间
            invalidTime: '',    // 结束时间
            strategyType: '',   // 触发事件
            marketingType: ''   // 营销类型
        }
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>) => bindActionCreators(
    {
        // onIncrement: actions.incrementEnthusiasm,
        // onDecrement: actions.decrementEnthusiasm,
        strategyList: actions.StrategyList,
        changePage: actions.ChangePage
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAdvancedSearchForm as any));
