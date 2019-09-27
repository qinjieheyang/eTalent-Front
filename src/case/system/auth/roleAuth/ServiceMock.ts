import Mock from 'mockjs';

//  负责伪造后端 WebApi数据
export class ServiceMock {
    public constructor() { }


    //根据是否封存查询用户下所有的机构,树形结构展示
    public searchRoleTree = async () => {
        const { list } = Mock.mock({
            list: [{
                "childRoleGroupList": [
                    {
                        "parentRoleGroupId": "@id",
                        "roleGroupId": "@id",
                        "roleGroupName": "普通用户",
                        "roleType": "string"
                    },
                    {
                        "parentRoleGroupId": "@id",
                        "roleGroupId": "@id",
                        "roleGroupName": "部门负责人",
                        "roleType": "string"
                    },
                    {
                        "parentRoleGroupId": "@id",
                        "roleGroupId": "@id",
                        "roleGroupName": "人力资源管理员",
                        "roleType": "string"
                    },
                ],
                "parentRoleGroupId": "@id",
                "roleGroupId": "@id",
                "roleGroupName": "角色分类",
                "roleType": "string"
            }]
        });
        return list;
    };

}

export interface IService extends ServiceMock { }
