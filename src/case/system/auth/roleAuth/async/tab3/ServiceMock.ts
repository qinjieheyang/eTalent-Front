//  负责伪造后端 WebApi数据
import Mock from 'mockjs';

export class ServiceMock {

    public searchRoleAuthTree = async () => {
        const { list } = Mock.mock({
            list: [{
                "childMenuList|15": [
                    {
                        "fieldId": "@id",
                        "fieldName": "字段-@integer(1, 100)",
                        "readWriteCode": "string",
                        "tableId": 0,
                        "tableName": "string"
                    },
                ],
                "fieldId": "@id",
                "fieldName": "基本信息",
                "readWriteCode": "string",
                "tableId": 0,
                "tableName": "string"
            }]
        });
        return list;
    };
}


export interface IService extends ServiceMock { }
