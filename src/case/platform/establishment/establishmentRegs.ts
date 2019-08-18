// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import planReg  from "./plan/Reg";
import monitorReg  from "./monitor/Reg";
import reportReg  from "./report/Reg";

const establishmentRegs = Framework.Case.Reg.CreatePathReg(
  "编制管理",
  Framework.Com.Icons.App.establishment,
  "/platform/establishment"
);

establishmentRegs.addChild(planReg);
establishmentRegs.addChild(monitorReg);
establishmentRegs.addChild(reportReg);

export { establishmentRegs };
