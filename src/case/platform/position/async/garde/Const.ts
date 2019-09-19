import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IConst = {
  title: "职位管理",
  icon: Framework.Com.Icons.App.position,
  routePath: "/platform/position/post",
  isTest: true,
  case: "Post",
  topPath: "/platform"
};

export const TabList = [
  {
    key: 'system',
    tab: '职位体系',
  },
  {
    key: 'group',
    tab: '职位族设置',
  },
  {
    key: 'position',
    tab: '职位设置',
  },
  {
    key: 'level',
    tab: '职级设置',
  },
  {
    key: 'grade',
    tab: '职等设置',
  },
]