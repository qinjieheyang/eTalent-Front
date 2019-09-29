//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";

export class Service extends Framework.Case.ServiceBase implements IService {

    //根据是否封存查询用户下所有的机构,树形结构展示
    public searchRoleTree = async () => {
        const data = await this.http.get("/roleAuth/searchRoleTree");
        return data["result"]["list"] || [];
    };

}
