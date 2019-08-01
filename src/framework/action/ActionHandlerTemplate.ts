import { ActionHandlerBase } from "./ActionHandlerBase";
import { IActionHandler } from "./IActionHandler";

/** 动作处理器模板 */
export class ActionHandlerTemplate extends ActionHandlerBase
  implements IActionHandler {
  public Next: IActionHandler | undefined;

  public data: any;

  public constructor(
    caseName: string,
    actionType: string,
    data: any,
    containerPath?: string
  ) {
    super(caseName, actionType, containerPath);
    this.data = data;
  }

  /** 禁止使用 */
  public meReducer = (newContainer: any): any => {
    throw new Error("必须重写: HandleActionTemplate.meReducer()");
  };
}
