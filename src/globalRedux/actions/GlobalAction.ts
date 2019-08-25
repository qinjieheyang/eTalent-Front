enum ActionType {
    LoginIn = "Login/In",
    LoginOff = "Login/Off",
    BrowserRefresh = "Browser/Refresh",
    HttpRequesting = "Http/Requesting",
    HttpRequested = "Http/Requested",
    CodeTablesReset = "CodeTables/Reset",
    SetUserInfo = "App/SetUserInfo",
    Loading = "App/Loading",
    setMenuRegs = "APP/setMenuRegs"
}

/** 全局动作 */
class GlobalActionClass {
    public Type = ActionType;

    public LoginIn() {
        return { type: ActionType.LoginIn };
    }

    public SetUserInfo(user: any) {
        return { type: ActionType.SetUserInfo };
    }

    public LoginOff() {
        return { type: ActionType.LoginOff };
    }

    public HttpRequesting() {
        return { type: ActionType.HttpRequesting };
    }

    public HttpRequested() {
        return { type: ActionType.HttpRequested };
    }

    public BrowserRefresh(data?: any) {
        return { type: ActionType.BrowserRefresh, data };
    }

    public CodeTablesReset(data: any) {
        return { type: ActionType.CodeTablesReset, data };
    }

    public startLoading(){
        return {type: ActionType.Loading, data:true};
    }

    public endLoading(){
        return {type: ActionType.Loading, data:false};
    }

    public setMenuRegs(data: any){
        return {type: ActionType.setMenuRegs, data}
    }
}

export const GlobalAction = new GlobalActionClass();
