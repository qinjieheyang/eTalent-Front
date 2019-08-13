import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import { IMessageRow } from "./State";

// const Mock = require('mockjs');

export class ServiceMock {
    public constructor() {}

    // 数据初始化
    public getInit = async (): Promise<{
        msgRows: IMessageRow[];
        currentUser: GlobalRedux.States.IUserInfo;
    }> => {
        // const data = Mock.mock({
        //     "msgRows|10": [{
        //         id: '@id',
        //         title: "消息@increment",
        //         remark: "消息详细说明@integer(10, 100)"
        //     }]
        // });
        // console.log(data);
        const msgRows = [
            { id: "1", title: "消息1", remark: "消息详细说明1" },
            { id: "2", title: "消息2", remark: "消息详细说明2" }
        ];
        const currentUser = { loginName: "admin", userName: "管理员", authorization: "...key...." };
        return { msgRows, currentUser };
    };
}

export interface IService extends ServiceMock {}
