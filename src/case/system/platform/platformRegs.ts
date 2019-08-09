// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";
import { Const } from "./Const";

import roleReg from "./role/Reg";
import userReg from "./user/Reg";
import {organizationRegs} from "./organization/organizationRegs";
import {positionRegs} from "./position/positionRegs";

const platRegs = Framework.Case.Reg.CreateCaseReg(Const, () => import("./Page"));

platRegs.addChild(organizationRegs);
platRegs.addChild(positionRegs);
platRegs.addChild(roleReg);
platRegs.addChild(userReg);

export { platRegs };
