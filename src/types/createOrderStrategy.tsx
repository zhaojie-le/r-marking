export interface CreateOrderStrategy {
    formState: any;
    serviceOptions: any[];
    orderState: any[];
    rules: { strategyType: number; settings: any };
    weChatPush: any;
}
