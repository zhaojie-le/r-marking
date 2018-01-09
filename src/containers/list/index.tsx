import './index.scss';
import * as React from 'react';
import * as actions from '../../actions';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { 
        Button, 
        Layout, 
        Table, 
        DatePicker,
        Form,
        Input,
        Row,
        Col,
        Select,
        Pagination,
    } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Content } = Layout;
const { RangePicker } = DatePicker;

export interface Props {
    data: any;
    listData: any;
    totalInfo: number; 
    strategyList: (params: any) => void;
    editStart: (id: number, index: number) => void;
    editStop: (id: number, index: number) => void;
    form?: any;
    params?: any;
}
/**
 * 数组每项增加一个key值，组件要求
 * @param arr  传入需要处理的数组
 */
export const arrayAddKey = (arr: any) => {
    if (arr && arr.length > 0) {
        let array = arr.map( (item, i) => Object.assign({}, item, { key: i }) );
        return array;
    }
};
/**
 * 提取select框内部选项通用部分
 * @param arr 传入数组
 */
export const selectcChildren = (arr: any) => {
    if (arr && arr.length > 0) {
        let Children = arrayAddKey(arr).map((item) => {
            return <Option value={item.id + ''} key={item.id}>{item.name}</Option>;
        });
        return Children;
    }
};

class List extends React.Component<Props, {}> {
    private columns;
    constructor(props: Props, context: any) {
        super(props, context);
        // 表格头部设置参数
        this.columns = [
            {title: '策略ID', dataIndex: 'pkId', key: '0',
                // 跳转连接方式-跳转至详情页
                render: (text, record) => {
                    let url = '/detailOrderStrategy/' + text;
                    return (<Link to={url}>{text}</Link>); 
                }    
            }, 
            {title: '策略名称', dataIndex: 'strategyName', key: '1'}, 
            {title: '策略状态', dataIndex: 'strategyState', key: '2'}, 
            {title: '创建时间', dataIndex: 'createTime', key: '3'},
            // {title: '有效时间', dataIndex: 'effectiveTime', key: '4'}, 
            // {title: '失效时间', dataIndex: 'invalidTime', key: '5'}, 
            {title: '有效时间', dataIndex: 'time', key: '5',
                render: text => {
                    let arr = text && text.split('/');
                    let effective = arr && arr[0];
                    let invalid = arr && arr[1];
                    return (
                        <div><p>{effective}</p><p>{invalid}</p></div>
                    );
                }
            },
            {title: '触发事件', dataIndex: 'strategyType', key: '6'}, 
            {title: '营销方式', dataIndex: 'actionExpression', key: '7'}, 
            {title: '营销类型', dataIndex: 'marketingType', key: '8'}, 
            {title: '推送人数', dataIndex: 'pushAmount', key: '9'}, 
            {title: '创建人邮箱', dataIndex: 'createrEmail', key: '10'}, 
            {title: '操作', dataIndex: 'marketingTypeInt', key: '11',
                render: (text, record, index) => {
                    let changeBtn: any;
                    let editBtn: any;
                    if (record.showButton === 2) {
                        changeBtn =  <Button size="small" onClick={this.editStopClick.bind(this, record.pkId, index)}>暂停</Button>;
                    } else if (record.showButton === 1) {
                        changeBtn =  <Button size="small" onClick={this.editStartClick.bind(this, record.pkId, index)}>开始</Button>;
                    }
                    if (record.showEdit) {
                        let url = '/detailOrderStrategy/' + record.pkId + '#edit';
                        editBtn =  <Button size="small" onClick={this.editClick.bind(this, record.pkId, index)} className="btn-edit"><Link to={url}>修改</Link></Button>;
                    } else {
                        editBtn =  '';
                    }
                    return (
                        <div><div>{changeBtn}</div><div>{editBtn}</div></div>
                    );
                }
            }
        ];
    }

    componentDidMount() {
        // 初始请求列表数据，首屏10条数据
        const { strategyList } = this.props;
        strategyList(this.props.params);
        this.props.form.validateFields();
    }
    // 列表数据－按钮－暂停
    editStopClick = (id, index) => {
        const { editStop } = this.props;
        editStop!(id, index);
    }
    // 列表数据－按钮－启动
    editStartClick = (id, index) => {
        const { editStart } = this.props;
        editStart!(id, index);
    }
    // 列表数据－按钮－修改
    editClick = (id, index) => {
        console.log(id);
    }
    // 输入框赋值,策略id
    pkIdChange = (e) => {
        e.target.value = this.limitNumberInput(e.target.value);   
        this.props.params.pkId = e.target.value;
    }
    // 输入框赋值,活动id
    activityIdChange = (e) => {
        e.target.value = this.limitNumberInput(e.target.value);
        this.props.params.activityId = e.target.value;
    }
    // 输入框赋值,策略名称
    strategyNameChange = (e) => {
        this.props.params.strategyName = e.target.value;
    }
    // select,策略状态
    strategyStateChange = (value) => {
        this.props.params.strategyState = `${value}`;
    }
    // select,触发事件
    strategyTypeChange = (value) => {
        this.props.params.strategyType = `${value}`;
    }
    // select,营销类型
    marketingTypeChange = (value) => {
        this.props.params.marketingType = `${value}`;
    }
    // 输入框，限制输入纯数字
    limitNumberInput = (n) => {
       return n = n.replace(/[^\d]/g, '');  
    }

    // 选择时间后，获取时间
    onTimeChange = (value, dateString) => {
         // value 未转换格式；dateString 转换后格式
        let dataArray = dateString;
        if (dataArray.length > 0) {
            this.props.params.effectiveTime = dataArray[0];
            this.props.params.invalidTime = dataArray[1];
        }
    }
    // 点击查询按钮
    searchClick = () => {
        console.log('search', this.props.params);
        const { strategyList } = this.props;
        strategyList(this.props.params);
    }

    // 表格搜索清空
    searchReset = () => {
        this.props.form.resetFields();
        this.props.params.pkId = '',            // 策略ID
        this.props.params.pageSize = 10,        // 每页列表数
        this.props.params.activityId = '',      // 活动ID
        this.props.params.strategyName = '',    // 策略名称
        this.props.params.strategyState = '',   // 策略状态
        this.props.params.effectiveTime = '',   // 起始时间
        this.props.params.invalidTime = '',     // 结束时间
        this.props.params.strategyType = '',    // 触发事件
        this.props.params.marketingType = '';   // 营销类型

        const { strategyList } = this.props;
        strategyList(this.props.params);
    }

    // 分页器
    pageChange = (page) => {
        this.props.params.page = page;
        const { strategyList } = this.props;
        // 请求分页数据
        strategyList(this.props.params);
    }
    // // 新增策略按钮
    // newStrategyClick = (value) => {
    //     console.log(`selected ${value}`);
    //     const { history }: any = this.props;
    //     const path = '/createOrderStrategy/' + `${value}`;
    //     history.push(path);
    //     // TODU  跳转至新增策略页面，将触发事件id带入
    // }

    render() {
        const { data, listData, totalInfo } = this.props;
        // 设置表单的排列间隙
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        // 添加input自动校验
        const { getFieldDecorator } = this.props.form;

        // 输入框固定宽
        const inputWidth = {
            width: '123px'
        };
        return (
            <Layout>
                <Header className="list-head">
                    营销管理平台
                    {/* <Select placeholder="新增策略" style={{ marginLeft: '10px', width: '130px' }} onChange={this.newStrategyClick}>
                        {selectcChildren(data.strategyType)}
                    </Select> */}
                    <Button style={{ marginLeft: '10px'}}><Link to="/createOrderStrategy">新增策略</Link></Button>
                </Header>
                <Layout>
                    <Content className="content-wrap">
                        <div className="search-box">
                            {/* 搜索表单 */}
                            <Form className="form-box">
                                <Row>
                                    <Col span={8}>
                                        <FormItem label="策略ID" {...formItemLayout}>
                                            {getFieldDecorator('pkId')(
                                                <Input placeholder="请输入策略ID" maxLength="30" style={inputWidth} onChange={this.pkIdChange}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} >
                                        <FormItem label="活动ID" {...formItemLayout} >
                                            {getFieldDecorator('activityId')(
                                                <Input placeholder="请输入活动ID" maxLength="30" style={inputWidth} onChange={this.activityIdChange}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} >
                                        <FormItem label="策略名称" {...formItemLayout} >
                                            {getFieldDecorator('strategyName')(
                                                <Input placeholder="请输入策略名称" style={inputWidth} onChange={this.strategyNameChange}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} >
                                        <FormItem label="策略状态" {...formItemLayout} >
                                            {getFieldDecorator('strategyState')(
                                                <Select placeholder="请选择" style={inputWidth} onChange={this.strategyStateChange}>
                                                    {/* {strategyStatusChildren} */}
                                                    {selectcChildren(data.strategyStatus)}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} >
                                        <FormItem label="触发事件" {...formItemLayout} >
                                            {getFieldDecorator('marketing')(
                                                <Select placeholder="请选择" style={inputWidth} onChange={this.strategyTypeChange}>
                                                    {selectcChildren(data.strategyType)}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8} >
                                        <FormItem label="营销类型" {...formItemLayout} >
                                            {getFieldDecorator('marketingType')(
                                                <Select placeholder="请选择" style={inputWidth} onChange={this.marketingTypeChange}>
                                                    {selectcChildren(data.marketingType)}
                                                </Select>
                                            )}   
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8} >
                                        <FormItem label="策略时间" {...formItemLayout} >
                                        {getFieldDecorator('strategyTime')(
                                            <RangePicker
                                                showTime={{ format: 'HH:mm' }}
                                                format="YYYY-MM-DD HH:mm"
                                                placeholder={['Start Time', 'End Time']}
                                                onChange={this.onTimeChange}
                                                style={{width: 250}}
                                            />
                                        )} 
                                        </FormItem>
                                    </Col>
                                    <Col span={8} >
                                        <FormItem label="策略时间" {...formItemLayout} >
                                            <Button type="primary" onClick={this.searchClick}>查询</Button>
                                            <Button onClick={this.searchReset} style={{ marginLeft: '15px' }}>重置</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        {/* 列表表格 */}
                        <div style={{background: '#fff'}}>
                            <Table style={{background: '#fff'}} columns={this.columns} dataSource={listData} bordered={true} pagination={false}/>
                            <div style={{position: 'relative', height: '70px'}}>
                                <Pagination style={{position: 'absolute', right: '20px', top: '18px'}} onChange={this.pageChange} defaultCurrent={1} total={totalInfo} />
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
        data: state.list.data,                                                                       // 项目数据
        params: state.list.params,                                                                   // 搜索传參
        totalInfo: state.list.totalInfo,                                                             // 列表数据总数
        listData: state.list.listData && state.list.listData.map( (item, i) => Object.assign({}, item, { key: i }, {time: item.effectiveTime + '/' + item.invalidTime}) ),       // 列表数组－处理后表格展示的数据     
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>) => bindActionCreators(
    {
        editStop: actions.EditStop,
        editStart: actions.EditStart,
        strategyList: actions.StrategyList  
    },
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAdvancedSearchForm as any));