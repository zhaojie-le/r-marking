export interface ListState {
    listData: any;
    totalInfo: number;
    editStopId:string,       // 列表暂停id
    editStartId: string,     // 列表开启id
    editStartInx: number,    // 列表编辑启动下标值
    editStopInx: number,     // 列表编辑暂停下标值
    params: {
        page: number,
        pageSize: number,
        pkId: string,           // 策略ID
        activityId: string,     // 活动ID
        strategyName: string,   // 策略名称
        strategyState: number,  // 策略状态
        effectiveTime: string,  // 起始时间
        invalidTime: string,    // 结束时间
        strategyType: number,   // 触发事件
        marketingType: number   // 营销类型
    },  
}
// 列表接口数据格式
export interface ListGetSuccess {
    data: any;
    totalInfo: number;
    code: number;
    strategyTypeList: number[];
    strategyType: number;
}