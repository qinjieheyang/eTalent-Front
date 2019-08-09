// 子系统注册器
import * as Framework from "src/framework/Framework";
// import roleReg from "./role/Reg";
// import userReg from "./user/Reg";
const sysReg = Framework.Case.Reg.CreatePathReg(
  "系统",
  Framework.Com.Icons.Case.system,
  "/system"
);
// sysReg.addChild(roleReg);
// sysReg.addChild(userReg);
export { sysReg };
