//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITreeBase, ITableParam } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {

    //根据是否封存查询用户下所有的机构,树形结构展示
    public getOrganizationTree = async (): Promise<ITreeBase[]> => {
        const data = await this.http.get("/organization/getOrganizationTree");
        return data["result"]["list"] || [];
    };

    public getUserArchiveList = async (params: ITableParam) => {
        const data = await this.http.get("/userArchive/getUserArchiveList", params);
        let res = {
            tableData: [],
            total: 0
        }
        if (data && data.list) {
            res.tableData = data.list;
        }
        if (data && data.total) {
            res.total = data.total;
        }
        return res;
    }
}
