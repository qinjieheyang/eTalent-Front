import * as Framework from "src/framework/Framework";
import { GlobalAction } from "../actions/GlobalAction";
type IAction = Framework.Action.IAction;

export function isWaitHttpRequest(oldState: boolean, action: IAction) {
    console.log(action.type);
    switch (action.type) {
        case GlobalAction.HttpRequesting.toString():
            return true;
        case GlobalAction.HttpRequested.toString():
            return false;
        case GlobalAction.BrowserRefresh.toString():
            return true;
        default:
            return false;
    }
}
