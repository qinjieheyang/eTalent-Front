import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IConst = {
  title: "岗位维护",
  icon: Framework.Com.Icons.Case.file,
  routePath: "/platform/point/post",
  isTest: true,
  case: "PointPost",
  topPath: "/platform"
};

export const TabList = [
  {
    key: 'table',
    tab: '岗位表',
    icon: 'table'
  },
  {
    key: 'flow',
    tab: '岗位图',
    icon: 'apartment'
  }
]

export const Columns = [
  {

  }
]