import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IAsyncConst = {
  title: "职级",
  isTest: true,
  case: "PositionLevel"
};

export const Columns = [
  {
    title: '职级名称',
    key: 'positionLevelName',
    dataType: "linkText",
    width: 150,
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
  {
    title: '职级说明',
    key: 'positionLevelRemark',
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
]