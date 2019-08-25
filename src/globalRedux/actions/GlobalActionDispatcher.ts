import { Dispatch } from "redux";
import { IGlobalService } from "../services/GlobalServiceMock";
import { ActionDispatcherBase } from "./ActionDispatcherBase";
import { GlobalAction } from "./GlobalAction";

export class GlobalActionDispatcher extends ActionDispatcherBase {
    private service: IGlobalService;
    public constructor(dispatch: Dispatch, ownProps: any, service: IGlobalService) {
        super(dispatch, ownProps);
        this.service = service;
    }

    public globalSetUserInfo = async (user: any) => {
        window.console.warn("call  GlobalActionDispatcher.globalInit()");
        console.log("user:"+ JSON.stringify(user))
        this.service.getInit();
    };

    public globalLoadingStart = async () => {
        this.send(GlobalAction.startLoading());
    }

    public globalLoadingEnd = async () => {
        this.send(GlobalAction.endLoading());
    }

    public globalSetMeunRegs = async (data: any) => {
        this.send(GlobalAction.setMenuRegs(data));
    }
}
