//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITableParam } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {

    //新增职位族
    public addPositionGroup = async () => {

    }

    //删除职位族
    public deletePositionGroup = async () => {

    }

    //编辑职位族
    public editPositionGroup = async () => {

    }

    //获取所有的职位族
    public getAllPositionGroup = async (params: ITableParam) => {
        const data = await this.http.get("/positionGroup/getAllPositionGroup", params);
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

    //职位族排序
    public sortPositionGroup = async () => {

    }

    //职位族导出excel
    public downloadPositionGroupExcel = async () => {

    }

}
