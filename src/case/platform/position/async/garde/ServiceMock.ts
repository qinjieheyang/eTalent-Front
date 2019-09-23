//  负责伪造后端 WebApi数据
import Mock from 'mockjs';
// import Framework from "src/framework/Framework";
import { Paging } from 'src/framework/case/model/Struct';

export class ServiceMock {

    //新增职等
    public addPositionGrade = async () => {

    }

    //删除职等
    public deletePositionGrade = async () => {

    }

    //编辑职等
    public editPositionGrade = async () => {

    }

    //分页查询列表
    public getPositionGradeList = async (params: Paging) => {
        const { list, total } = Mock.mock({
            "list|10": [{
                key: "@id",
                positionGroupId: "@id",
                positionGradeName: "职等-@integer(1, 100)",
                positionGradeRemark: "职等描述",
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
