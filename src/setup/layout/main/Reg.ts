import { modelIniData } from "src/case/system/role/Model";
import * as Framework from "src/framework/Framework";
import { Const } from "./Const";

const reg = Framework.Case.Reg.CreateCaseReg(Const, () => import("./MainLayout"));

reg.reducer = (state: any = modelIniData, action: any) => {
  return state;
};
reg.reduxStatePropertyName = "mainLayout";
export default reg;
