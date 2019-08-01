// 动作定义、动作发布者实现（包括真实和伪造）

import * as redux from "redux";

/** 动作发布器基类 */
export abstract class ActionDispatcherBase {
  protected reduxDispatch: redux.Dispatch;
  protected ownProps: any;

  constructor(dispatch: redux.Dispatch, ownProps: any) {
    this.reduxDispatch = dispatch;
    this.ownProps = ownProps;
  }

  protected send = (action: { type: string; data?: any }) => {
    this.reduxDispatch(action);
  };

  protected getGlobalState = (): any => {
    let getStateFunc: any = null;
    const callFunc = (dispatchTemp: any, getStateTemp: any) =>
      (getStateFunc = getStateTemp);
    const reduxDispatchTemp: any = this.reduxDispatch;
    reduxDispatchTemp(callFunc);
    if (getStateFunc === null) {
      throw new Error("框架崩溃：ErrorCode=988094393");
    }
    const globalState = getStateFunc();
    return globalState;
  };
}
