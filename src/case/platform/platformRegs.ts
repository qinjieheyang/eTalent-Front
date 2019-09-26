// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import { userRegs } from "./user/userRegs";
import { organizationRegs } from "./organization/organizationRegs";
import positionReg from "./position/Reg";
import { pointRegs } from "./point/pointRegs";
import { establishmentRegs } from "./establishment/establishmentRegs"

const platRegs = Framework.Case.Reg.CreateTopReg("组织中台", "/platform");

platRegs.addChild(organizationRegs);
platRegs.addChild(positionReg);
platRegs.addChild(pointRegs);
platRegs.addChild(userRegs);
platRegs.addChild(establishmentRegs);

export { platRegs };
