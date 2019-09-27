//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITreeBase } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {

    //根据是否封存查询用户下所有的机构,树形结构展示
    public searchRoleTree = async (): Promise<ITreeBase[]> => {
        const data = await this.http.get("/organization/getOrganizationTree");
        return data["result"]["list"] || [];
    };

}
