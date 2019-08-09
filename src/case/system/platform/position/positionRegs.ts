// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import postReg  from "./post/Reg";

const positionRegs = Framework.Case.Reg.CreatePathReg(
  "职位管理",
  Framework.Com.Icons.Case.folder,
  "/platform/position"
);

positionRegs.addChild(postReg);

export { positionRegs };
