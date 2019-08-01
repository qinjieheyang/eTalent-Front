// 站内注册器集合根
import viewReg from "src/case/report/viewReport/Reg";
import homeReg from "src/case/system/home/Reg";
import { sysReg } from "src/case/system/systemRegs";
import * as Framework from "src/framework/Framework";

const mainRegs = new Framework.Case.RegCollection();

mainRegs.add(viewReg);
mainRegs.add(sysReg);
mainRegs.add(homeReg);

export { mainRegs };
