// // 子系统注册器
import * as Framework from "src/framework/Framework";
import { AuthRegs } from "./auth/AuthRegs";
const sysReg = Framework.Case.Reg.CreateTopReg("系统管理", "/system");
sysReg.addChild(AuthRegs);
export { sysReg };
