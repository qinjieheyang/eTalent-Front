import * as Framework from "src/framework/Framework";
import { GlobalAction } from "../actions/GlobalAction";
type IAction = Framework.Action.IAction;

export function menuRegs(oldState: any, action: IAction): Framework.Case.RegCollection {
  switch (action.type) {
    case GlobalAction.Type.setMenuRegs.toString():
      return action.data;

    default:
      return oldState;
    }
}
