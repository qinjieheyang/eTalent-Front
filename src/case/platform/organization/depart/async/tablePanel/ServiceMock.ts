import Mock from 'mockjs';
import { ITreeBase, ITableParam } from "./State";

const generateOrgCode = () => {
    const { regexp } = Mock.mock({
        'regexp|1-4': /\d{3}/
    })
    return "1" + regexp;
}

//  负责伪造后端 WebApi数据
export class ServiceMock {
    public constructor() { }

    // 数据初始化
    public getInit = async (params: ITableParam): Promise<{ treeData: ITreeBase[], tableData: any[], total: number }> => {
        const treeData = await this.getOrganizationTree();
        const { tableData, total } = await this.getOrganizationList(params);
        return { treeData, tableData, total };
    };
    // 表格数据
    public getOrganizationList = async (params: ITableParam): Promise<{ tableData: any[], total: number }> => {
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
    };

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

    //根据是否封存查询用户下所有的机构,图形化展示
    public getOrganizationGraphics = async (): Promise<any[]> => {

        const list = [
            { key: 0, title: "人力资源部经理", online: 10, color: "#FF8C58" },
            { key: 1, parent: 0, title: "人事专员", online: 10, color: "#2FDD93" },
            { key: 2, parent: 1, title: "人事专员", online: 10, color: "#19ADE6" },
            { key: 3, parent: 1, title: "人事专员", online: 10, color: "#19ADE6" },
            { key: 4, parent: 1, title: "人事专员", online: 10, color: "#19ADE6" },
            { key: 5, parent: 1, title: "人事专员", online: 10, color: "#19ADE6" },
            { key: 6, parent: 1, title: "人事专员", online: 10, color: "#19ADE6" },
            { key: 7, parent: 1, title: "人事专员", online: 10, color: "#19ADE6" },
          ]

        return list;
    }

    
}

export interface IService extends ServiceMock { }
