// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import signupReg  from "./signup/Reg";
import userinfoReg  from "./userinfo/Reg";

const userRegs = Framework.Case.Reg.CreatePathReg(
  "用户管理",
  Framework.Com.Icons.App.user,
  "/platform/user"
);

userRegs.addChild(signupReg);
userRegs.addChild(userinfoReg);

export { userRegs };
