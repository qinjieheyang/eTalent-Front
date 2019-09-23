// import Mock from 'mockjs';

//  负责伪造后端 WebApi数据
export class ServiceMock {
    public constructor() { }

    //根据是否封存查询用户下所有的机构,图形化展示
    public getOrganizationGraphics = async (): Promise<any[]> => {

        const list = [
            { orgId: 0, orgName: "人力资源部经理", online: 10, color: "#FF8C58" },
            { orgId: 1, orgParentId: 0, orgName: "人事专员", online: 10, color: "#2FDD93" },
            { orgId: 2, orgParentId: 1, orgName: "人事专员", online: 10, color: "#19ADE6" },
            { orgId: 3, orgParentId: 1, orgName: "人事专员", online: 10, color: "#19ADE6" },
            { orgId: 4, orgParentId: 1, orgName: "人事专员", online: 10, color: "#19ADE6" },
            { orgId: 5, orgParentId: 1, orgName: "人事专员", online: 10, color: "#19ADE6" },
            { orgId: 6, orgParentId: 1, orgName: "人事专员", online: 10, color: "#19ADE6" },
            { orgId: 7, orgParentId: 1, orgName: "人事专员", online: 10, color: "#19ADE6" },
        ]
        return list;
    }


}

export interface IService extends ServiceMock { }
