// 站内注册器集合根
// import viewReg from "src/case/report/viewReport/Reg";
import homeReg from "src/case/home/Reg";
import {platRegs} from "src/case/platform/platformRegs";
import { sysReg } from "src/case/system/systemRegs";
import * as Framework from "src/framework/Framework";

const mainRegs = new Framework.Case.RegCollection();

mainRegs.add(homeReg);
mainRegs.add(platRegs);
mainRegs.add(sysReg);

export { mainRegs };
