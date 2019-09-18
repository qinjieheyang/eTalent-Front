//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITreeBase, ITableParam } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {
    // 数据初始化
    public getInit = async (params: ITableParam): Promise<{ treeData: ITreeBase[], tableData: any[], total: number }> => {
        const treeData = await this.getOrganizationTree();
        if (!treeData.length) {
            return { treeData: [], tableData: [], total: 0 };
        }
        if (params.orgParentId === undefined && treeData.length) {
            params.orgParentId = treeData[0].orgId;
        }
        const { tableData, total } = await this.getOrganizationList(params);
        return { treeData, tableData, total };
    };

    //根据条件分页查询用户下所有的机构
    public getOrganizationList = async (param: ITableParam): Promise<{ tableData: any[], total: number }> => {
        const data = await this.http.get("/organization/getOrganizationList", param);
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
    };

    //根据是否封存查询用户下所有的机构,树形结构展示
    public getOrganizationTree = async (): Promise<ITreeBase[]> => {
        const data = await this.http.get("/organization/getOrganizationTree");
        return data["result"]["list"] || [];
    };

    public getOrganizationGraphics = async (): Promise<any[]> => {
        const data = await this.http.get("/organization/getOrganizationGraphics");
        return data["result"]["list"] || [];
    }
}
