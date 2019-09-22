import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IAsyncConst = {
  title: "职位设置",
  isTest: true,
  case: "Group"
};

export const Columns = [
  {
    title: '职位族',
    key: 'positionGroupName',
    dataType: "linkText",
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
  {
    title: '职位名称',
    key: 'positionGroupName',
    dataType: "linkText",
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
  {
    title: '职级',
    key: 'positionGroupName',
    dataType: "linkText",
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
  {
    title: '职等',
    key: 'positionGroupName',
    dataType: "linkText",
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
]