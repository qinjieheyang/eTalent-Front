//  负责伪造后端 WebApi数据
import Mock from 'mockjs';

export class ServiceMock {

    public searchRoleAuthTree = async () => {
        const { list } = Mock.mock({
            list: [{
                "childMenuList": [
                    {
                        "createTime": "2019-09-27T06:16:43.448Z",
                        "funcType": "string",
                        "funcUrl": "string",
                        "hasMenu": 0,
                        "iconUrl": "string",
                        "menuId": "@id",
                        "menuName": "string",
                        "operatorId": "@id",
                        "parentMenuId": "@id",
                        "updateTime": "2019-09-27T06:16:43.448Z"
                    },
                    {
                        "createTime": "2019-09-27T06:16:43.448Z",
                        "funcType": "string",
                        "funcUrl": "string",
                        "hasMenu": 0,
                        "iconUrl": "string",
                        "menuId": "@id",
                        "menuName": "string",
                        "operatorId": "@id",
                        "parentMenuId": "@id",
                        "updateTime": "2019-09-27T06:16:43.448Z"
                    },
                ],
                "createTime": "2019-09-27T06:16:43.448Z",
                "funcType": "string",
                "funcUrl": "string",
                "hasMenu": 0,
                "iconUrl": "string",
                "menuId": "@id",
                "menuName": "string",
                "operatorId": "@id",
                "parentMenuId": "@id",
                "updateTime": "2019-09-27T06:16:43.448Z"
            }]
        });
        return list;
    };
}

    
export interface IService extends ServiceMock { }
