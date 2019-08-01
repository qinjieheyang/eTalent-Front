export class ServiceMock {
    public login = async (
        values: any
    ): Promise<{ loginName?: string; userName?: string; token?: string; error?: string }> => {
        if (values.loginName !== "admin" || values.password !== "admin") {
            return { error: "用户名或密码不正确" };
        }

        return { userName: "超级管理员", token: "---token-key---", loginName: "admin", error: undefined };
    };
}

// tslint:disable-next-line:no-empty-interface
export interface IService extends ServiceMock {}
