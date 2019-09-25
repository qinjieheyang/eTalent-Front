//  负责伪造后端 WebApi数据

import Mock from 'mockjs';
import { ITreeBase, ITableParam } from "./State";

const generateOrgCode = () => {
    const { regexp } = Mock.mock({
        'regexp|1-4': /\d{3}/
    })
    return "1" + regexp;
}

export class ServiceMock {
    //根据是否封存查询用户下所有的机构,树形结构展示
    public getOrganizationTree = async (): Promise<ITreeBase[]> => {
        const { list } = Mock.mock({
            list: [{
                companyId: "@id",
                createTime: "@date",
                isEnable: true, //是否启用
                operatorId: "@id",
                orgCode: "1", //机构编码
                orgFullname: "机构全称-@integer(1, 100)", //机构全称
                orgId: "@id", //机构ID
                orgManagerId: "@id", //机构负责人
                orgName: "中国雄安投资集团", //机构名称
                orgParentId: "@id", //父级机构ID
                "orgType|1": ["集团", "单位", "部门"],  //机构类型
                sortId: "@increment", //序号
                "childList|3-5": [{
                    companyId: "@id",
                    createTime: "@date",
                    isEnable: "@boolean", //是否封存
                    operatorId: "@id",
                    orgCode: generateOrgCode(), //机构编码
                    orgFullname: "机构全称-@integer(1, 100)", //机构全称
                    orgId: "@id", //机构ID
                    orgManagerId: "@id", //机构负责人
                    orgName: "机构-@integer(1, 100)", //机构名称
                    orgParentId: "@id", //父级机构ID
                    "orgType|@integer(0, 2)": ["集团", "单位", "部门"],  //机构类型
                    sortId: "@increment", //序号
                    "childList|3-5": [{
                        companyId: "@id",
                        createTime: "@date",
                        isEnable: "@boolean", //是否封存
                        operatorId: "@id",
                        orgCode: generateOrgCode(), //机构编码
                        orgFullname: "机构全称-@integer(1, 100)", //机构全称
                        orgId: "@id", //机构ID
                        orgManagerId: "@id", //机构负责人
                        orgName: "机构-@integer(1, 100)", //机构名称
                        orgParentId: "@id", //父级机构ID
                        "orgType|@integer(0, 2)": ["集团", "单位", "部门"],  //机构类型
                        sortId: "@increment", //序号
                    }], //子级机构
                }], //子级机构
            }]
        });
        return list;
    };

    public getUserArchiveList = async (params: ITableParam) => {
        const { list, total } = Mock.mock({
            "list|10": [{
                "address": "xxx",
                "age": "@integer(1, 100)",
                "archiveId": 0,
                "attritionDate": "2019-09-25T06:16:47.011Z",
                "attritionType": "string",
                "birthdate": "2019-09-25T06:16:47.011Z",
                "birthplace": "string",
                "businessUnitId": 0,
                "businessUnitName": 0,
                "companyId": 0,
                "converseDate": "2019-09-25T06:16:47.011Z",
                "createTime": "2019-09-25T06:16:47.011Z",
                "email": "string",
                "employeeNumber": "string",
                "firstDegree": "string",
                "firstWorkDate": "2019-09-25T06:16:47.011Z",
                "gender": "string",
                "highestDegree": "string",
                "hiredate": "2019-09-25T06:16:47.011Z",
                "idNumber": "string",
                "idType": "string",
                "isDelete": 0,
                "maritalStatus": "string",
                "nationality": 0,
                "operatorId": 0,
                "orgId": 0,
                "orgName": 0,
                "politicalStatus": 0,
                "postId": 0,
                "postName": 0,
                "probationDueDate": "2019-09-25T06:16:47.011Z",
                "probationPeriod": 0,
                "professionalCertification": "string",
                "professionalLevel": "string",
                "professionalTitle": "string",
                "servingAge": 0,
                "supervisorId": 0,
                "supervisorUserName": 0,
                "tel": "string",
                "updateTime": "2019-09-25T06:16:47.011Z",
                "userCategory": "string",
                "userId": 0,
                "userName": "string",
                "workingPeriod": 0
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
