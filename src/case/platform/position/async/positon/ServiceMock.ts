//  负责伪造后端 WebApi数据

export class ServiceMock {
    public constructor() { }

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

}

export interface IService extends ServiceMock { }
