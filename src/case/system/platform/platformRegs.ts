// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";
// import { Const } from "./Const";

import roleReg from "./role/Reg";
import userReg from "./user/Reg";
import {organizationRegs} from "./organization/organizationRegs";
import {positionRegs} from "./position/positionRegs";

const platRegs = Framework.Case.Reg.CreatePathReg(
  "组织中台",
  Framework.Com.Icons.Case.system,
  "/platform"
);

// const platRegs = new Framework.Case.RegCollection();
platRegs.addChild(organizationRegs);
platRegs.addChild(positionRegs);
platRegs.addChild(roleReg);
platRegs.addChild(userReg);

export { platRegs };
