// 负责将模块注册到框架（包括路由、菜单）

import * as Framework from "src/framework/Framework";
import { Const } from "./Const";

const reg = Framework.Case.Reg.CreateCaseReg(Const, () => import("./Page"));

export default reg;
