import * as Framework from "src/framework/Framework";

export const Const: Framework.Case.IAsyncConst = {
  title: "岗位图",
  isTest: true,
  case: "PositionLevel"
};

export const Columns = [
  {
    title: '职等名称',
    key: 'positionGradeName',
    dataType: "linkText",
    width: 150,
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
  {
    title: '职等说明',
    key: 'positionGradeRemark',
    enableSearch: false,
    canAutoOrder: false,
    checkNull: false,
  },
]