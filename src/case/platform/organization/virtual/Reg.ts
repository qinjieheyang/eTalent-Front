import * as Framework from "src/framework/Framework";
import { Const } from "./Const";
 

const reg = Framework.Case.Reg.CreateCaseReg(Const, () =>
  import("./Page")
);


export default reg;
