import * as Framework from "src/framework/Framework";
import { GlobalAction } from "../actions/GlobalAction";
type IAction = Framework.Action.IAction;

export function isLoading(isLoading:boolean, action: IAction) {
    switch (action.type) {
        case GlobalAction.Type.Loading:
            return action.data;
        default:
            return false;
    }
}
