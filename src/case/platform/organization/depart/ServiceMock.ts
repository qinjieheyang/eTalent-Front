import Mock from 'mockjs';
import { ITreeBase, ITableParam } from "./State";

//  负责伪造后端 WebApi数据
export class ServiceMock {
    public constructor() { }

    // 数据初始化
    public getInit = async (): Promise<{ treeData: ITreeBase[], tableData: any[] }> => {
        const treeData = await this.getOrganizationTree();
        if (!treeData.length) {
            return { treeData: [], tableData: [] };
        }
        const tableData = await this.getOrganizationList({
            orgParentId: treeData[0].orgId,
            isEnable: false,
            currentPage: 1,
            pageSize: 10,
        });
        return { treeData, tableData };
    };
    // 表格数据
    public getOrganizationList = async ({ orgParentId, isEnable, currentPage, pageSize, querFieldVos }: ITableParam): Promise<any[]> => {
        const data: Array<any> = [];
        for (let i = 0; i < 20; i++) {
            data.push({
                key: `a${i}`,
                dataIndex: `a${i}`,
                name: `Edrward ${i}`,
                age: "aaa32",
                address: `London Park no. ${i}`,
            });
        }
        return data;
    };

    //根据是否封存查询用户下所有的机构,树形结构展示
    public getOrganizationTree = async (): Promise<ITreeBase[]> => {
        const result = Mock.mock({
            list: [{
                companyId: "@id",
                createTime: "@date",
                isEnable: "@boolean", //是否封存
                operatorId: "@id",
                orgCode: "机构编码-@integer(1, 100)", //机构编码
                orgFullname: "机构全称-@integer(1, 100)", //机构全称
                orgId: "@id", //机构ID
                orgManagerId: "@id", //机构负责人
                orgName: "中国雄安投资集团", //机构名称
                orgParentId: "@id", //父级机构ID
                "orgType|@integer(0, 2)": ["集团", "单位", "部门"],  //机构类型
                sortId: "@increment", //序号
                "childList|3-5": [{
                    companyId: "@id",
                    createTime: "@date",
                    isEnable: "@boolean", //是否封存
                    operatorId: "@id",
                    orgCode: "机构编码-@integer(1, 100)", //机构编码
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
                        orgCode: "机构编码-@integer(1, 100)", //机构编码
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
        return result["list"]
    };
}

export interface IService extends ServiceMock { }
