数据应用平台项目
=================

项目技术架构 
--------------------
目录划分采用的是**按角色划分目录**。

项目采用官方提供的脚手架工具[create-react-app](https://github.com/facebookincubator/create-react-app)。

本地开发mock用express。利用package.json 自带的proxy功能。 

#### 工具列表  

| 框架 | 描述 |
|---------|-------------|
| [react]               | 面向状态编程框架 |
| [react-router]        | 单页应用路由 |
| [react-redux]         | 单向数据流状态管理器  |
| [redux-observable]    | redux异步编程解决方案 |

[react]: https://facebook.github.io/react/
[react-router]: https://github.com/ReactTraining/react-router
[react-redux]: https://github.com/reactjs/react-redux
[redux-observable]: https://github.com/redux-observable/redux-observable

 页面功能结构

```javascript

├── 列表页
│   ├── 查询搜索
│   ├── 列表
├── 创建策略页
│   ├── 名称
│   ├── 生效时间
│   ├── 触发事件
│   │   ├── 触发规则
│   ├── 触发条件
│   │   ├── 用户条件
│   ├── 营销类别
│   ├── 营销方式
│   ├── 责任人
├── 详情页
│   ├── 策略信息

```

项目－目录结构

```javascript
├── build                              // 打包构建后文件夹
├── config                             // 项目webpack配置
├── public                             // 项目入口html文件
├── scripts                            // 项目启动及构建命令文件
├── server                             // 本地mock目录及配置，启动npm start
├── tslint.json                        // tslint 配置文件
├── tsconfig.json                      // TypeScript 配置文件
├── package.json                       // 项目配置文件
├── src                                // 生产目录
│   ├── actions                        // 事件的定义接口文件
│   │   ├── index.tsx                  // 接口文件的入口文件
│   │   ├── list.tsx                   // 按页面或模块划分细分文件
│   │   ├── ...tsx
│   ├── constants                      // 事件的静态变量文件
│   │   ├── index.tsx                  // 接口文件的入口文件
│   │   ├── list.tsx                   // 按页面或模块划分细分文件
│   │   ├── ...tsx
│   ├── epics                          // 异步请求
│   │   ├── index.tsx                  // 接口文件的入口文件
│   │   ├── list.tsx                   // 按页面或模块划分细分文件
│   │   ├── ...tsx
│   ├── reducers                       // 异步请求－分发数据
│   │   ├── index.tsx                  // 接口文件的入口文件
│   │   ├── list.tsx                   // 按页面或模块划分细分文件
│   │   ├── ...tsx
│   ├── types                          // 定义state接口数据
│   │   ├── index.tsx                  // 接口文件的入口文件
│   │   ├── list.tsx                   // 按页面或模块划分细分文件
│   │   ├── ...tsx
│   ├── containers                     // 路由及页面
│   │   ├── list                       // 列表页
│   │   ├── createOrderStrategy        // 创建策略页
│   │   ├── detailOrderStrategy.tsx    // 详情页
│   │   ├── index.tsx                  // 页面入口文件
│   ├── components                     // 内部组件，非路由级别组件
│   │   ├── index.tsx                  // 所有组件的入口文件
│   │   ├── detailMarketingModel       // 详情页营销方式组件
│   │   ├── errorBoundary              // 报错拦截组件
│   │   ├── marketingCategory          // 营销类别组件
│   │   │   ├── inputCategory          // 营销类别－多项输入组件
│   │   │   ├── selectCategory         // 营销类别－单选组件
│   │   │   ├── index.tsx              // 营销类别外层控制入口文件
│   │   ├── marketingModel             // 营销方式组件
│   │   │   ├── loadElement            // 元素加载
│   │   │   ├── messageModel           // 消息推送类型
│   │   │   ├── pageHanger             // 页面挂件
│   │   │   ├── switchEditState        // 组件编辑－保存切换组件
│   │   │   ├── index.tsx              // 营销方式入口文件
│   │   ├── strategyRule               // 触发规则组件
│   │   │   ├── allUser                // 所有用户
│   │   │   ├── importUser             // 导入用户
│   │   │   ├── order                  // 订单策略
│   │   │   ├── orderPay               // 支付预约
│   │   │   ├── pendant                // 页面挂件
│   │   │   ├── pushMessage            // 外推消息
│   │   │   ├── storedValue            // 储值返券
│   │   │   ├── showRuleInfo.tsx       // 保存后展示文案组件
│   │   │   ├── index.tsx              // 触发规则外层控制入口文件
│   │   ├── treeSelect                 // 树形选择组件
│   └── store.tsx                      // store及reducer配置文件
│   └── App.tsx                        // 项目路由层文件
│   └── index.tsx                      // 统一入口react文件
│   └── registerServiceWorker.ts    
### webpack配置
`用的是脚手架的默认配置，项目暂时无需特殊配置。`

### server配置
* 路由  

```javascript
var isMock = process.env.isMock;
router.get('/get-pagelist', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/abtest/testLists.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});
```
* mockData模拟数据




