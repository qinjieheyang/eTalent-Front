// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import roleAuthReg  from "./roleAuth/Reg";
import userAuthReg  from "./userAuth/Reg";
import roleSearchReg  from "./roleSearch/Reg";
import transferAuthReg  from "./transferAuth/Reg";
// import historyReg  from "./history/Reg";
// import virtualReg  from "./virtual/Reg";

const authRegs = Framework.Case.Reg.CreatePathReg(
  "权限管理",
  Framework.Com.Icons.App.org,
  "/system/auth"
);

authRegs.addChild(roleAuthReg);
authRegs.addChild(userAuthReg);
authRegs.addChild(roleSearchReg);
authRegs.addChild(transferAuthReg);

export { authRegs };
