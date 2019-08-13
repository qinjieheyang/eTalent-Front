//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITreeBase } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {
    // 数据初始化
    public getInit = async (): Promise<ITreeBase[]> => {
        const data = await this.http.get("/api/org/departTree");
        return data;
    };
}
