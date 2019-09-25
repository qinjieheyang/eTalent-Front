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
    key: 'userName',
    dataType: "linkText",
    enableSearch: true,
    canAutoOrder: true,
    width: 120
  },
  {
    title: '单位',
    key: 'businessUnitName',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '部门',
    key: 'orgName',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '岗位',
    key: 'postName',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '性别',
    key: 'gender',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '联系电话',
    key: 'tel',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '电子邮件',
    key: 'email',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '直接上级',
    key: 'supervisorUserName',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  },
  {
    title: '入职日期',
    key: 'hiredate',
    dataType: 'date',
    enableSearch: true,
    canAutoOrder: true,
    width: 150
  }
]
