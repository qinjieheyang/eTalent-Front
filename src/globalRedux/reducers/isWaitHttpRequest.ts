import * as Framework from "src/framework/Framework";
import { GlobalAction } from "../actions/GlobalAction";
type IAction = Framework.Action.IAction;

export function isWaitHttpRequest(isWait: boolean, action: IAction) {
    switch (action.type) {
        case GlobalAction.HttpRequesting.toString():
            return true;
        case GlobalAction.HttpRequested.toString():
            return false;
        case GlobalAction.Type.BrowserRefresh:
            return isWait;
        default:
            return false;
    }
}
