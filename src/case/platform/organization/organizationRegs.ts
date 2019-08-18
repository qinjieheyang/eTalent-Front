// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import departReg  from "./depart/Reg";
import historyReg  from "./history/Reg";
import virtualReg  from "./virtual/Reg";

const organizationRegs = Framework.Case.Reg.CreatePathReg(
  "组织机构",
  Framework.Com.Icons.App.org,
  "/platform/org"
);

organizationRegs.addChild(departReg);
organizationRegs.addChild(historyReg);
organizationRegs.addChild(virtualReg);

export { organizationRegs };
