import * as Framework from "src/framework/Framework";
import { GlobalAction } from "../actions/GlobalAction";
import { CodeTableCollection } from "../states/inner/CodeTableCollection";
type IAction = Framework.Action.IAction;

export function codeTables(oldState: any, action: IAction): CodeTableCollection {
    switch (action.type) {
        case GlobalAction.Type.CodeTablesReset.toString():
            return action.data;

        default:
            return oldState;
    }
}
