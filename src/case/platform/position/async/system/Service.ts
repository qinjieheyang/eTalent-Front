//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { IState } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {
    // 数据初始化
    public getInit = async (): Promise<{
        initData: IState;
    }> => {
        const data = await this.http.get("/api/platform/position/getInit");
        return data;
    };

    //按职级展示职位体系
    public showByPositionLevel = async () => {
        
    }

    //按职位展示职位体系
    public showByPosition = async () => {

    }

}
