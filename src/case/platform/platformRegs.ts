// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";
import { Const } from "./Const";

import {userRegs} from "./user/userRegs";
import {organizationRegs} from "./organization/organizationRegs";
import {positionRegs} from "./position/positionRegs";
import {pointRegs} from "./point/pointRegs";
import {establishmentRegs} from "./establishment/establishmentRegs"
// import roleReg from "./role/Reg";

const platRegs = Framework.Case.Reg.CreateCaseReg(Const, () => import("./Page"));

platRegs.addChild(organizationRegs);
platRegs.addChild(positionRegs);
platRegs.addChild(pointRegs);
platRegs.addChild(userRegs);
platRegs.addChild(establishmentRegs);
// platRegs.addChild(roleReg);
// platRegs.addChild(userReg);

export { platRegs };
