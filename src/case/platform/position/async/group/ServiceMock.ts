//  负责伪造后端 WebApi数据
import Mock from 'mockjs';
import Framework from 'src/framework/Framework';
import { ITableParam } from "./State";

export class ServiceMock {
    public constructor() { }


    //新增职位族
    public addPositionGroup = async () => {

    }

    //删除职位族
    public deletePositionGroup = async (positionGroupIds: string[]) => {
        return {
            "code": 0,
            "message": "string",
            "result": {},
            "success": true
        }
    }

    //编辑职位族
    public editPositionGroup = async () => {

    }

    //获取所有的职位族
    public getAllPositionGroup = async (params: ITableParam) => {
        const { list, total } = Mock.mock({
            "list|10": [{
                key: "@id",
                positionGroupId: "@id",
                positionGroupName: "职位族-@integer(1, 100)",
                sortId: "@increment", //序号
            }],
            total: 100
        });

        return {
            tableData: list,
            total
        }
    }

    //职位族排序
    public sortPositionGroup = async () => {

    }

    //职位族导出excel
    public downloadPositionGroupExcel = async () => {
        Framework.Utils.UtilDownload.File({
            url: "https://qinjee-datacenter-1253673776.cos.ap-guangzhou.myqcloud.com/user/text.xlsx",
            fileName: "导出名称.xlsx"
        })
    }
}

export interface IService extends ServiceMock { }
