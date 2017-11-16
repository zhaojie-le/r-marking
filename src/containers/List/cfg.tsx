export default {
    // 策略状态
    strategyStatus: [
        { id: '1', name: '未开始' },
        { id: '2', name: '待开始' },
        { id: '3', name: '进行中' },
        { id: '4', name: '暂停' },
        { id: '5', name: '已过期' },
        { id: '6', name: '已完成' }
    ],
    // 营销类型
    marketingType: [
        {id: '1', name: '发券'},
        {id: '2', name: '用券'},
        {id: '3', name: '拉新'},
        {id: '4', name: '商品[不拼团]'},
        {id: '5', name: '购买会员卡'},
        {id: '6', name: '评价'},
        {id: '7', name: '支付'},
        {id: '8', name: '调查问卷'},
        {id: '9', name: '活动'},
        {id: '10', name: '商品[拼团]'}
    ],

    // 触发事件
    strategyType: [
        {id: '1', name: '订单事件'},
        {id: '2', name: '导入用户'},
        {id: '3', name: '支付预约页面营销'},
        {id: '4', name: '外推消息'},
        {id: '5', name: '全部用户'},
        {id: '6', name: '储值返券'},
        {id: '7', name: '页面挂件'}
    ]
};