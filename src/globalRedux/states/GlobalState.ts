import * as Framework from "src/framework/Framework";
import { CodeTableCollection } from "./inner/CodeTableCollection";

import { IGlobalState } from "./IGlobalState";

const globalIniState: IGlobalState = {
    codeTables: new CodeTableCollection(),
    currentUser: { userName: "empty", loginName: "empty", authorization: "empty" },
    isWaitHttpRequest: false,
    menuRegCollection: new Framework.Case.RegCollection()
};

export { globalIniState };
