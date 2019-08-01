# 进度
### 第三方框架和开发工具的下载、配置、集成
```
阿里巴巴的antd前端框架      ：  完成100% ，包括LESS换肤
jest单元测试工具            ：  完成100%
react框架                   ：  完成100%
redux状态管理                      ：  完成100%
router路由                      ：  完成100%
typescript支持                  ：  完成100%
第三方库的DLL分离             ：  完成100%
开发调试环境WebPack配置
发布幻觉Webpack配置
less、css、style样式支持                   ：  完成100%
CSS抽离到单独文件               ：  完成100%
tslint源代码规范约束            ：  完成100% 
recharts图表                    ：  完成100% 
 
```
### 项目框架的设计与开发
#####   |-- src               源代码目录 
```
|--Index.tsx                系统入口(100%)
|--index.less               全局antd主题色(未来扩展)
```


##### |--  |--caseCommon项目公共
```
|--Case页面入口基类    ：  提供初始化事件、后端服务接口注入（100%）
```
 

##### |--framework/case（100%）
```
数据模型的标准接口定义      ：      Case数据模型定义标准，为模型修改工具类库提供服务
用例常量定义接口定义        ：      统一Case常量定义
模块异步加载等待组件定义    ：      异步加载功能模块的时候等待组件
用例模块注册器              ：      注册一个用例模块
用例模块注册器管理容器      :       管理系统全部注册器，提供路由地址查找、路由组件生成的服务
后端服务基类                ：      提供HTTP代理的对象的注入
```

##### |--framework/codeMng  系统公共代码表统一管理（50%） ，剩余1天
```
 
1）增量更新
2）缓存到浏览器
3）查询
4）为UI组件提供统一代码数据源
```

##### |--framework/com  公共UI组件  ( 30%) ，剩余3天 ，依据项目需要不断的扩展
```
|--btn      页面工具栏、按钮、按钮分组 (30%)
|--charts    曲线图、柱状图、饼状图、雷达图 ，不带交互的图表(80%)
|--form      各种输入框组件、输入项布局组件、分组布局组件（50%） 
|--icon      iconfont阿里图标云服务的封装（100%） 
|--table/baseTable  只读表格封装，支持常用显示风格、数据格式转换、代码转换、常用操作按钮（70%） 

|--tree树       支持检索定位 （60%）
```
##### |--framework/data   （100%）
```
|--buildtree        树建造器，支持将Join表、parentID表自由装置为树结构（100%）
|--dataTable      内存表 ，支持新增、修改、删除、上移、下移、记录树遍历、模糊全文筛选。
|--searchTable      内存表搜索器，支持Where <、>、!、=、like 分页筛选。

```

##### |--framework/http（90%） 剩余0.5天
```
1)支持get、post、delete、put
2)后端异常统一处理、日志、提醒用户
3）集成redux，为后端请求超时，提供等待框显示和关闭触发服务
4）为客户端调用，提供非数据部分的统一移除
```

#### |--test/fake(100%)
```
1) 伪造数据表Rows
2）伪造Tree表Rows
3）伪造代码表
 
```


## |--utils
```
|--UtilBrowserStorage.ts      浏览器缓存，长期和会话级(100%)                                           
|--UtilLog.ts                 日志(100%)                                                          
|--UtilMessage.ts             消息提醒(100%)                                           
|--UtilNumber.ts              数值计算工具类,包括货币、计算、四舍五入(100%)                                
|--UtilValueData.ts           基本值类型工具类，包括(100%)    
```



## globalRedux              全局数据模型Redux（90%）
```
|--actions                  动作
|--connects                 redux链接
|--reduces                  修改全局State
|--services                 访问后端服务
|--states                   全局数据模型
|--GlobalRedux.ts           外部调用入口
|--Store.ts                 存储
```


## setup                    前端系统启动配置
```
|--layout/main              站内布局+路由
|--layout/out               站外布局+路由
|--App.tsx                  集成Redux + Router + 日期格式转换 + Antd主题颜色
 ```
 



## src/case    ( 用例根目录)
```
|--mainRegs.ts              内部 Case注册器根
|--outRegs.ts               外部 Case注册器根
 
```



#### 每个Case目录
```
|--Const.ts                 常量
|--Page.tsx                 入口页面
|--Reg.ts                   Case注册器
|--Service.ts               后端服务调用
|--ServiceMock.ts           后端服务调用伪造
|--State.ts                 数据模型
```
