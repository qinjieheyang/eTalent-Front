import * as Framework from "src/framework/Framework";
import { GlobalAction } from "../actions/GlobalAction";
type IAction = Framework.Action.IAction;

export function isWaitHttpRequest(oldState: boolean, action: IAction) {
    switch (action.type) {
        case GlobalAction.HttpRequesting.toString():
            return true;
        case GlobalAction.HttpRequested.toString():
            return false;
        default:
            return false;
    }
}
