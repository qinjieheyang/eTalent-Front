import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IAsyncConst = {
  title: "职位族",
  isTest: true,
  case: "Group"
};

export const Columns = [
  {
    title: '职位族名称',
    key: 'positionGroupName',
    dataType: "linkText",
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  }
]