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
                        "menuName": "机构",
                        "operatorId": "@id",
                        "parentMenuId": "@id",
                        "updateTime": "2019-09-27T06:16:43.448Z",
                        "childMenuList|3": [
                            {
                                "createTime": "2019-09-27T06:16:43.448Z",
                                "funcType": "string",
                                "funcUrl": "string",
                                "hasMenu": 0,
                                "iconUrl": "string",
                                "menuId": "@id",
                                "menuName": "功能-@integer(1, 100)",
                                "operatorId": "@id",
                                "parentMenuId": "@id",
                                "updateTime": "2019-09-27T06:16:43.448Z",
                            }
                        ]
                    },
                    {
                        "createTime": "2019-09-27T06:16:43.448Z",
                        "funcType": "string",
                        "funcUrl": "string",
                        "hasMenu": 0,
                        "iconUrl": "string",
                        "menuId": "@id",
                        "menuName": "人员",
                        "operatorId": "@id",
                        "parentMenuId": "@id",
                        "updateTime": "2019-09-27T06:16:43.448Z",
                        "childMenuList|10": [
                            {
                                "createTime": "2019-09-27T06:16:43.448Z",
                                "funcType": "string",
                                "funcUrl": "string",
                                "hasMenu": 0,
                                "iconUrl": "string",
                                "menuId": "@id",
                                "menuName": "功能-@integer(1, 100)",
                                "operatorId": "@id",
                                "parentMenuId": "@id",
                                "updateTime": "2019-09-27T06:16:43.448Z",
                            }
                        ]
                    },
                    {
                        "createTime": "2019-09-27T06:16:43.448Z",
                        "funcType": "string",
                        "funcUrl": "string",
                        "hasMenu": 0,
                        "iconUrl": "string",
                        "menuId": "@id",
                        "menuName": "门户",
                        "operatorId": "@id",
                        "parentMenuId": "@id",
                        "updateTime": "2019-09-27T06:16:43.448Z",
                        "childMenuList|2": [
                            {
                                "createTime": "2019-09-27T06:16:43.448Z",
                                "funcType": "string",
                                "funcUrl": "string",
                                "hasMenu": 0,
                                "iconUrl": "string",
                                "menuId": "@id",
                                "menuName": "功能-@integer(1, 100)",
                                "operatorId": "@id",
                                "parentMenuId": "@id",
                                "updateTime": "2019-09-27T06:16:43.448Z",
                            }
                        ]
                    },
                    {
                        "createTime": "2019-09-27T06:16:43.448Z",
                        "funcType": "string",
                        "funcUrl": "string",
                        "hasMenu": 0,
                        "iconUrl": "string",
                        "menuId": "@id",
                        "menuName": "经理门户",
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
                "menuName": "系统功能模块",
                "operatorId": "@id",
                "parentMenuId": "@id",
                "updateTime": "2019-09-27T06:16:43.448Z"
            }]
        });
        return list;
    };
}


export interface IService extends ServiceMock { }
