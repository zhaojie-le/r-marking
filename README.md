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

目录结构
--------------------
* [config、scripts是构建工具目录](#webpack配置)  

* public 是html ico资源目录  

* [server 后台服务](#server配置)  

* src 是前端资源目录  

    * actions 动作目录  

    * components 通用组件（业务级别组件）  

    * constants 静态变量目录（存放例如action.type）    
    
    * containers 页面级别容器 (例如：列表页入口)    
      
    * epics 异步中间件    
  
    * reducers reducer集合    

    * types 类型接口集合 (store 类型检查)    
        
    * app.tsx app入口文件    
    
    * index.tsx 入口文件  
      
    * app.scss 应用的一些通用css配置 例如盒模型的reset  

    * [Store.tsx 状态配置文件](#store配置) 

****
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




