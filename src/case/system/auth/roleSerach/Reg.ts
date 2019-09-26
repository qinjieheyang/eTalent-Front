import * as Framework from "src/framework/Framework";
import { Const } from "./Const";
 

const reg = Framework.Case.Reg.CreateCaseReg(Const, () =>
  import("./Page")
);

// 可选
// reg.reducer = (state: any = {}, action: any) => {
//   return state;
// };
export default reg;
