// 负责将模块注册到框架（包括路由、菜单）

import * as Framework from "src/framework/Framework";
import { Const } from "./Const";

import myResumeReg from "./myResume/Reg";
import myUserInfoReg from "./myUserInfo/Reg";

const reg = Framework.Case.Reg.CreateCaseReg(Const, () => import("./Page"));

reg.addChild(myResumeReg);
reg.addChild(myUserInfoReg);

export default reg;