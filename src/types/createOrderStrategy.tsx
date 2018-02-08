export interface CreateOrderStrategy {
    formState: any;
    serviceOptions: any[];
    orderState: any[];
    rules: { strategyType: number; settings: any; ruleHadBack: boolean };
    weChatPush: any;
    showOrderDetailCheck: boolean;
    getHomePageCount: number;
}
