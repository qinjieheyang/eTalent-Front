import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IConst = {
  title: "角色授权",
  icon: Framework.Com.Icons.emptyIcon,
  routePath: "/system/auth/roleAuth",
  isTest: true,
  case: "roleAuth",
  topPath:"/system"
};

export const TabList = [
  {
    key: 'tab-1',
    tab: '功能权限'
  },
  {
    key: 'tab-2',
    tab: '管理范围权限'
  },
  {
    key: 'tab-3',
    tab: '字段权限'
  },
  {
    key: 'tab-4',
    tab: '数据级权限'
  },
  {
    key: 'tab-5',
    tab: '报表权限'
  },
]
