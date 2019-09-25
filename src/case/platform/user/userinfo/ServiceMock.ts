//  负责伪造后端 WebApi数据

import Mock from 'mockjs';
import { ITreeBase } from "./State";

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

    public getUserArchiveList = async () => {
        const { list, total } = Mock.mock({
            "list|10": [{
                key: "@id",
                companyId: "@id",
                createTime: "@date",
                isEnable: true, //是否启用
                operatorId: "@id",
                orgCode: generateOrgCode(), //机构编码
                orgFullname: "机构全称-@integer(1, 100)", //机构全称
                orgId: "@id", //机构ID
                orgManagerId: "@id", //机构负责人
                orgManagerName: "负责人-@integer(1, 100)", //机构负责人
                orgName: "中国雄安投资集团", //机构名称
                orgParentId: "@id", //父级机构ID
                orgParentName: "父级-@integer(1, 100)", //父级机构ID
                "orgType|1": ["集团", "单位", "部门"],  //机构类型 ["集团", "单位", "部门"]
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
