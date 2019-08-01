import { Dispatch } from "redux";
import Framework from "src/framework/Framework";

import { GlobalActionDispatcher } from "../actions/GlobalActionDispatcher";
import { Const } from "../Const";
import { GlobalService } from "../services/GlobalService";
import { GlobalServiceMock } from "../services/GlobalServiceMock";
import { IGlobalState } from "../states/IGlobalState";

export function createMapCodeTableStateToProps(): any {
    const func = (globalState: IGlobalState): any => {
        return { codeTable: globalState.codeTables };
    };
    return func;
}

export function createGlobalMapStateToPropsFunc(): any {
    const func = (globalState: any): any => {
        return { globalState };
    };
    return func;
}

export function createGlobalMapDispatchToPropsFunc(): any {
    const func = (dispatch: Dispatch, ownProps: any): object => {
        if (Const.isTest === true && Framework.isDebugModel()) {
            return format(new GlobalActionDispatcher(dispatch, ownProps, new GlobalServiceMock()));
        }
        return format(new GlobalActionDispatcher(dispatch, ownProps, new GlobalService()));
    };

    return func;
}

function format(actionOld: any): any {
    const actionNew: any = {};
    for (const key in actionOld) {
        if (actionOld.hasOwnProperty(key)) {
            actionNew[key] = actionOld[key];
        }
    }
    return actionNew;
}
