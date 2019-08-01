import { IAction } from "./IAction";
import { IActionHandler } from "./IActionHandler";

import { UtilLog } from "../utils/Index";

/** 动作处理器基类 */
export abstract class ActionHandlerBase implements IActionHandler {
  public abstract data: any;

  public readonly type: string = "未定义";
  public readonly caseName: string;
  public Next: IActionHandler | undefined;

  /** xxx 或者 XXX.BBB.CCC 格式 */
  private readonly containerPath?: string;

  public constructor(
    caseName: string,
    actionType: string,
    containerPath?: string
  ) {
    if (caseName == null) {
      throw new Error("caseName不能为null");
    }
    if (actionType == null) {
      throw new Error("caseName不能为null");
    }
    this.type = "***/" + caseName + "/" + actionType;
    this.caseName = caseName;
    this.containerPath = containerPath;
  }

  public abstract meReducer(newContainer: any): void;

  public reducer = (oldGlobalState: any, action: IAction) => {
    // 检查
    if (oldGlobalState == null) {
      throw new Error("globalState 不能为null");
    }

    // 获取模型
    const newGlobalState = { ...oldGlobalState };

    // 初始化：更新数据的[上级容器]  --containerPath
    const updateContainer = this.getUpdateContainer(newGlobalState);

    this.meReducer(updateContainer);

    UtilLog.info("----HandleAction.start");
    UtilLog.info(
      "action.meReducer= %o , action.data= %o,   ----新newGlobalState=%o",
      this.type,
      this.data,
      newGlobalState
    );
    UtilLog.info("----HandleAction.end");

    if (this.Next === undefined) {
      return newGlobalState;
    }
    const nextGlobalState = this.Next.reducer(newGlobalState, this.Next);

    return nextGlobalState;
  };

  /** 初始化得到：更新数据的[上级容器] */
  public getUpdateContainer = (newGlobalState: any): any => {
    if (this.containerPath === undefined) {
      return newGlobalState;
    }

    const fullPath = this.containerPath.trim().replace(" ", "");
    const paths = fullPath.split(".");
    let container = newGlobalState;
    paths.forEach((path: string) => {
      if (path === "") {
        return;
      }
      if (container[path] === undefined) {
        throw new Error("获取父容器的路径错误 ,  path = " + path);
      }

      container[path] = { ...container[path] }; // 克隆
      container = container[path];
    });

    return container;
  };
}
