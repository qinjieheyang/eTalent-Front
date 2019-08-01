import { IService } from "./ServiceMock";

import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import { IMessageRow } from "./State";

import Framework from "src/framework/Framework";

export class Service extends Framework.Case.ServiceBase implements IService {
    public getInit = async (): Promise<{
        msgRows: IMessageRow[];
        currentUser: GlobalRedux.States.IUserInfo;
    }> => {
        // 后端获取数据
        const initData = await this.http.get("/api/app/getInit");
        // 格式化为前端数据
        return { msgRows: initData.message, currentUser: initData.user };
    };
}
