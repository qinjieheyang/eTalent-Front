// 站外注册器集合根
import * as Framework from "src/framework/Framework";
import { outReg } from "./out/outRegs";

const pageRegs = new Framework.Case.RegCollection();

pageRegs.add(outReg);

export { pageRegs };
