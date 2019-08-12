// 负责将模块注册到框架（包括路由、菜单）
import * as Framework from "src/framework/Framework";

import postReg  from "./post/Reg";
import descriptionReg  from "./description/Reg";

const pointRegs = Framework.Case.Reg.CreatePathReg(
  "岗位管理",
  Framework.Com.Icons.Case.folder,
  "/platform/point"
);

pointRegs.addChild(postReg);
pointRegs.addChild(descriptionReg);

export { pointRegs };
