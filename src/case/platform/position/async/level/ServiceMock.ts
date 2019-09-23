//  负责伪造后端 WebApi数据
import Mock from 'mockjs';
import { ITableParam } from "./State";

export class ServiceMock {
    public constructor() { }

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
        const { list, total } = Mock.mock({
            "list|10": [{
                key: "@id",
                positionGroupId: "@id",
                positionLevelName: "职级-@integer(1, 100)",
                positionLevelRemark: "职级描述",
                sortId: "@increment", //序号
            }],
            total: 100
        });

        return {
            tableData: list,
            total
        }
    }

}

export interface IService extends ServiceMock { }
