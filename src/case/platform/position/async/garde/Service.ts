//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { Paging } from 'src/framework/case/model/Struct';
// import { ITableParam } from "./State";


export class Service extends Framework.Case.ServiceBase implements IService {

    //新增职等
    public addPositionGrade = async () => {

    }

    //删除职等
    public deletePositionGrade = async () => {

    }

    //编辑职等
    public editPositionGrade = async () => {

    }

    //分页查询职等列表
    public getPositionGradeList = async (params: Paging) => {
        const data = await this.http.get("/positionGrade/getPositionGradeList", params);
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
