//  负责伪造后端 WebApi数据
import Mock from 'mockjs';
// import Framework from 'src/framework/Framework';
import { ITableParam } from "./State";

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
    public getPositionList = async (params: ITableParam) => {
        const { list, total } = Mock.mock({
            "list|10": [{
                key: "@id",
                positionId: "@id",
                positionGroupId: "@id",
                positionGroupName: "职位族-@integer(1, 100)",
                positionName: "职位-@integer(1, 100)",
                positionLevels: "1,2,3",
                positionGrades: "xxx,xxx,xxx",
                sortId: "@increment", //序号
            }],
            total: 100
        });

        return {
            tableData: list,
            total
        }
    }

    //职位排序
    public sortPosition = async () => {

    }

    // //获取职位族
    // public getPositonGroup = async () =>{
    //     return Mock.mock({
    //         "menuData": [{
    //             key: "@id",
    //             positionGroupId: "@id",
    //             positionGroupName: "职位族-@integer(1, 100)",
    //             positionName: "职位-@integer(1, 100)",
    //             positionLevels: "1,2,3",
    //             positionGrades: "xxx,xxx,xxx",
    //             sortId: "@increment", //序号
    //         }],
    //         total: 100
    //     });
    // }

}

export interface IService extends ServiceMock { }
