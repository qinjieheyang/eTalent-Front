import Mock from 'mockjs';
import { ITreeBase } from "./State";

//  负责伪造后端 WebApi数据
export class ServiceMock {
    public constructor() { }


    //根据是否封存查询用户下所有的机构,树形结构展示
    public searchRoleTree = async (): Promise<ITreeBase[]> => {
        const { list } = Mock.mock({
            list: [{
                "childRoleGroupList": [
                    {
                        "parentRoleGroupId": "@id",
                        "roleGroupId": "@id",
                        "roleGroupName": "普通用户",
                        "roleType": "string"
                    }
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
