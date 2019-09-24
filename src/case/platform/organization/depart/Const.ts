import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IConst = {
  title: "机构维护",
  icon: Framework.Com.Icons.Case.file,
  routePath: "/platform/org/depart",
  isTest: true,
  case: "Depart",
  topPath: "/platform"
};

export enum TabKey {
  Table = "1",
  Flow = "2"
}

export const TabList = [
  {
    key: 'table',
    tab: '机构表',
    icon: 'table'
  },
  {
    key: 'flow',
    tab: '机构图',
    icon: 'apartment'
  }
]