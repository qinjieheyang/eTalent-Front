import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IConst = {
  title: "用户信息",
  icon: Framework.Com.Icons.Case.user,
  routePath: "/platform/user/info",
  isTest: true,
  case: "UserInfo",
  topPath: "/platform"
};

export const Columns = [
  {
    title: '姓名',
    key: 'name',
    dataType: "linkText",
    width: 120
  },
  {
    title: '单位',
    key: 'unit',
    width: 150
  },
  {
    title: '部门',
    key: 'dept',
    width: 150
  },
]
