import { Dispatch } from "redux";
import { IGlobalService } from "../services/GlobalServiceMock";
import { ActionDispatcherBase } from "./ActionDispatcherBase";

export class GlobalActionDispatcher extends ActionDispatcherBase {
    private service: IGlobalService;
    public constructor(dispatch: Dispatch, ownProps: any, service: IGlobalService) {
        super(dispatch, ownProps);
        this.service = service;
    }

    public globalSetUserInfo = async (user: any) => {
        window.console.warn("call  GlobalActionDispatcher.globalInit()");
        this.service.getInit();
    };
}
