import * as Framework from "src/framework/Framework";
import { IGlobalState } from "../states/IGlobalState";
import { codeTables } from "./codeTables";
import { isWaitHttpRequest } from "./isWaitHttpRequest";
type IAction = Framework.Action.IAction;

export function reduxReducer(oldState: IGlobalState, action: any) {
    logBegin(action);

    // 传统模式 (不使用 combineReducers 的原因是不够直观)
    const newState: IGlobalState = {
        codeTables: codeTables(oldState.codeTables, action),
        isWaitHttpRequest: isWaitHttpRequest(oldState.isWaitHttpRequest, action),
        currentUser: oldState.currentUser,

        menuRegCollection: oldState.menuRegCollection
    };

    
    isWait(oldState, action);

    logEnd(oldState, newState);
    return newState;
}

function logBegin(action: IAction) {
    Framework.Utils.UtilLog.info("====================================");
    Framework.Utils.UtilLog.group("==>动作  :", action.type);
    // console.log(action,888)
}

function logEnd(oldState: IGlobalState, newState: any) {
    Framework.Utils.UtilLog.info("--新state  :", newState);
    Framework.Utils.UtilLog.groupEnd();
}

function isWait(oldState: IGlobalState, action: any) {
    const newState: IGlobalState = {
        codeTables: codeTables(oldState.codeTables, action),
        isWaitHttpRequest: isWaitHttpRequest(oldState.isWaitHttpRequest, action),
        currentUser: oldState.currentUser,
        menuRegCollection: oldState.menuRegCollection
    };
    return newState;
}