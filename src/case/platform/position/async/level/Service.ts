//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITableParam } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {

    //新增职级
    public addPositionLevel = async () => {

    }

    //删除职级
    public deletePositionLevel = async () => {

    }

    //编辑职级
    public editPositionLevel = async () => {

    }

    //分页查询职级列表
    public getPositionLevelList = async (params: ITableParam) => {
        const data = await this.http.get("/positionLevel/getPositionLevelList", params);
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
