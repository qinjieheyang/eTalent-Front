import Framework from "./Framework";
import { UtilBrowserStorage } from "./utils/UtilBrowserStorage";

export class CurrentUser {
    private static readonly KEY = "_current_user_";
    private static storage = UtilBrowserStorage;

    public static get isLogin() {
        const obj = this.storage.sessionGet(CurrentUser.KEY);
        if (obj == null) {
            return false;
        }
        return true;
    }

    public static get(): CurrentUser {
        const obj = this.storage.sessionGet(CurrentUser.KEY);
        if (obj == null) {
            throw new Error("currentUser没有初始化");
        }
        const user = new CurrentUser();
        user.token = obj.token;
        user.userName = obj.userName;
        user.loginName = obj.loginName;
        Framework.Test.assert(user.token == null, "userName不能为空");
        Framework.Test.assert(user.token == null, "loginName不能为空");
        Framework.Test.assert(user.token == null, "token不能为空");
        return obj;
    }

    public static login(userName: string, loginName: string, token: string) {
        if (userName == null) {
            throw new Error("userName不能为空");
        }
        if (loginName == null) {
            throw new Error("loginName不能为空");
        }
        if (token == null) {
            throw new Error("token不能为空");
        }

        this.storage.sessionSave(CurrentUser.KEY, { userName, loginName, token });
    }
    public static off() {
        this.storage.sessionDelete(CurrentUser.KEY);
    }

    private constructor() {}

    private userName: string;
    private loginName: string;
    private token: string;

    public get UserName() {
        return this.userName;
    }

    public get LoginName() {
        return this.loginName;
    }
    public get Token() {
        return this.token;
    }
}
