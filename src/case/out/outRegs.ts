// 子系统注册器
import * as Framework from "src/framework/Framework";
import loginReg from "./login/Reg";

const outReg = Framework.Case.Reg.CreatePathReg(
  "外部",
  Framework.Com.Icons.emptyIcon,
  "/out"
);
outReg.addChild(loginReg);
export { outReg };
