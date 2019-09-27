### 第三方框架和开发工具的下载、配置、集成
---

```
阿里巴巴的antd前端框架
jest单元测试工具
react框架
redux状态管理
router路由
typescript支持
第三方库的DLL分离
开发调试环境WebPack配置
less、css、style样式支持
CSS抽离到单独文件
tslint源代码规范约束
recharts图表
gojs 组织图
tinymce富文本编辑器
腾讯云COS对象存储
```

### 项目框架的设计与开发
---

```
|-- config  项目开发环境、生产环境配置
|-- public  公共静态文件目录
|-- src     源代码目录
```

### src 源代码目录
---

```
|--Index.tsx                系统入口
|--index.less               全局antd主题色
```

#### |-- styles 主题切换

```
|--var.less antDesign 主题 less 变量、自定义 less 变量
|--global.less 需要替换的公共部分的样式
```

#### |--caseCommon 项目公共

```
|--PageBase页面入口基类             :  提供初始化事件、后端服务接口注入、mock数据
|--PageAsyncBase异步加载页面入口基类 :  提供初始化事件、后端服务接口注入、mock数据
|--AsyncComponent异步加载组件公共基类
|--PageCommon                      :  封装PageLayout, PageSide, PageContent, PageCard方便页面复用
|--PageLoading                     :  loading动画
|--orgTree组织机构树
```

#### |--fonts 自定义字体图标

#### |--framework/case  case公共服务

```
数据模型的标准接口定义                     :      Case数据模型定义标准，为模型修改工具类库提供服务
IConst用例常量定义接口定义                 :      统一Case常量定义
LoadingCompontent模块异步加载等待组件定义  :      异步加载功能模块的时候等待组件
Reg用例模块注册器                         :      注册一个用例模块
RegCollection用例模块注册器管理容器        :      管理系统全部注册器，提供路由地址查找、路由组件生成的服务
ServiceBase后端服务基类                   :      提供HTTP代理的对象的注入
```

#### |--framework/codeMng 系统公共代码表统一管理

```

1）增量更新
2）缓存到浏览器
3）查询
4）为UI组件提供统一代码数据源
```

#### |--framework/com 公共 UI 组件 依据项目需要不断的扩展

```
|--btn       页面工具栏、按钮、按钮分组、按钮区域
|--charts    曲线图、柱状图、饼状图、雷达图 ，不带交互的图表
|--checkbox  带全选的checkbox列表
|--dropdown  下拉列表
|--form      各种输入框组件BoolInput、CheckBoxListInput、ComboBoxInput、ComboBoxTreeInput、DateInput、NumberInput、PasswordInput、RadioGroupInput、SelectInput、SelectTreeInput、TextAreaInput、TextInput
|--tag       表格搜索项的显示
|--icon      自定义图标配置
|--table/baseTable      只读表格封装，支持常用显示风格、数据格式转换、代码转换、常用操作按钮
|--table/AdaptiveTable  自适应布局、数据格式转换、代码转换、常用操作按钮
|--upload    通过获取服务端认证上传文件到腾讯云，拖拽上传、按钮上传
```

#### |--framework/data

```
|--buildtree      树建造器，支持将Join表、parentID表自由装置为树结构
|--dataTable      内存表 ，支持新增、修改、删除、上移、下移、记录树遍历、模糊全文筛选。
|--searchTable    内存表搜索器，支持Where <、>、!、=、like 分页筛选。

```

#### |--framework/http 请求模块

```
1)支持get、post、delete、put
2)后端异常统一处理、日志、提醒用户
3）集成redux，为后端请求超时，提供等待框显示和关闭触发服务
4）为客户端调用，提供非数据部分的统一移除
```

#### |--test/fake

```
1) 伪造数据表Rows
2）伪造Tree表Rows
3）伪造代码表

```

#### |--utils

```
|--UtilBrowserStorage.ts      浏览器缓存，长期和会话级
|--UtilLog.ts                 日志
|--UtilMessage.ts             消息提醒
|--UtilNumber.ts              数值计算工具类,包括货币、计算、四舍五入
|--UtilValue.ts               基本值类型工具类，包括
|--UtilDownload.ts            下载文件、下载图片
|--UtilUpload.ts              上传文件到腾讯云
```

#### |-- globalRedux 全局数据模型 Redux

```
|--actions                  动作
|--connects                 redux链接
|--reduces                  修改全局State
|--services                 访问后端服务
|--states                   全局数据模型
|--GlobalRedux.ts           外部调用入口
|--Store.ts                 存储
```

#### |-- locales 国际化支持

```
|--en-US
|--zh-CN
```

#### |-- setup 页面架构设置

```
|--App.tsx                  页面入口，集成Redux + Router + 日期格式转换 + Antd主题颜色
|--layout/main              站内布局+路由
    |-- MainLayout          页面布局入口
        |-- Header          头部
        |-- MainContent     内容
            |-- Sider       侧边栏

|--layout/out               站外布局+路由

```



### src/case ( 用例根目录)
---

```
|--mainRegs.ts              内部路由 Case注册器根
|--outRegs.ts               内部路由 Case注册器根

```

#### 每个 Case 目录

```
|--Const.ts                 常量
|--Page.tsx                 入口页面
|--Reg.ts                   Case注册器
|--Service.ts               后端服务调用
|--ServiceMock.ts           后端服务调用伪造
|--State.ts                 数据模型
|--|--async                 需要异步加载的页面模块
```

#### 页面开发、页面结构

```
|--home                         个人门户
|--platform                     组织中台
  |--organization               组织机构
    |--depart                   机构维护
      |--async..                机构表、机构图
    |--history                  历史机构
    |--virtual                  虚拟组织
  |--position                   职位管理
    |--system                   职位体系
    |--group                    职位族设置
    |--position                 职位设置
    |--level                    职级设置
    |--garde                    职等设置
  |--point                      岗位管理
    |--post                     岗位维护
      |--async..                岗位表、岗位图
  |--user                       用户管理
    |--register                 注册用户
    |--userinfo                 用户信息
  |--establishment              编制管理
|--system                       系统管理
  |--auth                       权限管理
    |--roleAuth                 角色授权
      |--tab1                   功能权限
      |--tab2                   管理范围权限
      |--tab3                   字段权限
      |--tab4                   数据级权限
      |--tab5                   报表权限
    |--userAuth                 用户授权
    |--roleSearch               角色反查
    |--transferAuth             权限管理
```
