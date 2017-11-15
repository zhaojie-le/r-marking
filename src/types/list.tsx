export interface ListState {
    languageName: string;
    enthusiasmLevel: number;
    listData: any;
    totalInfo: number;
    page: number;            // 发送请求页数
    pageSize: 10;            // 每页列表条数
    pkId: string;            // 策略ID
    activityId: string,      // 活动ID
    strategyName: string,    // 策略名称
    strategyState: string,   // 策略状态
    effectiveTime: string,   // 起始时间
    invalidTime: string,     // 结束时间
    strategyType: number,    // 触发事件
    marketingType: number    // 营销类型
}