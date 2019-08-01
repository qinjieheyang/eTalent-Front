import { IAction } from "./IAction";

/** 动作处理器 */
export interface IActionHandler extends IAction {
  reducer: (state: any, action: IAction) => any;
  Next: IActionHandler | undefined;
}
