// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import departReg  from "./depart/Reg";

const organizationRegs = Framework.Case.Reg.CreatePathReg(
  "机构管理",
  Framework.Com.Icons.Case.folder,
  "/platform/org"
);

organizationRegs.addChild(departReg);

export { organizationRegs };
