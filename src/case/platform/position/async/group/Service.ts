//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";
import { IState } from "./State";

export class Service extends Framework.Case.ServiceBase implements IService {
    // 数据初始化
    public getInit = async (): Promise<{
        initData: IState;
    }> => {
        const data = await this.http.get("/api/platform/position/getInit");
        return data;
    };

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
    public getAllPositionGroup = async () => {

    }

    //职位族排序
    public sortPositionGroup = async () => {

    }

    //职位族导出excel
    public downloadPositionGroupExcel = async () => {

    }

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
    public getPositionGradeList = async () => {

    }

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
    public getPositionLevelList = async () => {

    }

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
    public getPositionList = async () => {

    }

    //职位排序
    public sortPosition = async () => {

    }

    //按职位展示职位体系
    public showByPosition = async () => {

    }

}
