//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITreeBase, ITableParam } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {
    // 数据初始化
    public getInit = async (): Promise<{ treeData: ITreeBase[], tableData: any[] }> => {
        const treeData = await this.getOrganizationTree();
        if (!treeData.length) {
            return { treeData: [], tableData: [] };
        }
        const tableData = await this.getOrganizationList({
            orgParentId: treeData[0].orgId,
            isEnable: false,
            currentPage: 1,
            pageSize: 10,
        });
        return { treeData, tableData };
    };

    //根据条件分页查询用户下所有的机构
    public getOrganizationList = async ({ orgParentId, isEnable, currentPage, pageSize, querFieldVos }: ITableParam): Promise<any[]> => {
        const data = await this.http.get("/organization/getOrganizationList");
        return data;
    };

    //根据是否封存查询用户下所有的机构,树形结构展示
    public getOrganizationTree = async (): Promise<ITreeBase[]> => {
        const data = await this.http.get("/organization/getOrganizationTree");
        return data["result"]["list"] || [];
    };
}
