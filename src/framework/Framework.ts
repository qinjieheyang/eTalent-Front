import * as Action from "./action/Index";
import * as Case from "./case/Index";
import * as Com from "./com/Index";
import { Http } from "./http/Http";

import { CurrentUser } from "./CurrentUser";
import * as Test from "./test/Index";
import * as Utils from "./utils/Index";

function isDebugModel() {
    if (process.env.NODE_ENV === "development") {
        return true;
    }
    return false;
}

const DefaultHttp = new Http();
const Https = { Http, DefaultHttp };
export { Com, Utils, Action, Case, isDebugModel, DefaultHttp, Https, Test, CurrentUser };

const Framework = { Com, Utils, Action, Case, isDebugModel, DefaultHttp, Https, Test, CurrentUser };
export default Framework;
