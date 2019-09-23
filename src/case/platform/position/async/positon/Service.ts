//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { ITableParam } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {

    //按职级展示职位体系
    public showByPositionLevel = async () => {

    }

    //新增职位
    public addPosition = async () => {

    }

    //删除职位
    public deletePosition = async () => {

    }

    //职位导出excel
    public downloadPositionExcel = async () => {

    }

    //编辑职位
    public editPosition = async () => {

    }

    //分页查询职位信息
    public getPositionList = async (params: ITableParam) => {
        const data = await this.http.get("/position/getPositionList", params);

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

    //职位排序
    public sortPosition = async () => {

    }

    // //获取职位族
    // public getPositonGroup = async () =>{

    // }

}
