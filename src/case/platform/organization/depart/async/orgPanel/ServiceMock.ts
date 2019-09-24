// import Mock from 'mockjs';

//  负责伪造后端 WebApi数据
export class ServiceMock {
    public constructor() { }

    //根据是否封存查询用户下所有的机构,图形化展示
    public getOrganizationGraphics = async (): Promise<any[]> => {

        // const { list } = Mock.mock({
        //     "list|10": [{
        //         key: "@id",
        //         companyId: "@id",
        //         createTime: "@date",
        //         isEnable: true, //是否启用
        //         operatorId: "@id",
        //         orgCode: generateOrgCode(), //机构编码
        //         orgFullname: "机构全称-@integer(1, 100)", //机构全称
        //         orgId: "@id", //机构ID
        //         orgManagerId: "@id", //机构负责人
        //         orgManagerName: "负责人-@integer(1, 100)", //机构负责人
        //         orgName: "机构名称-@integer(1, 100)", //机构名称
        //         orgParentId: "@id", //父级机构ID
        //         orgParentName: "父级-@integer(1, 100)", //父级机构ID
        //         "orgType|1": ["集团", "单位", "部门"],  //机构类型 ["集团", "单位", "部门"],
        //         "color|+1": ["#FF8C58", "#2FDD93", "#19ADE6"],
        //         total: 20,
        //         online: 10,
        //         sortId: "@increment", //序号
        //     }]
        // });

        const list = [
            { isEnable: true, orgCode: "1", orgId: 0, avatar: "/user.png", orgName: "中国雄安投资集团", orgManagerName: "张三", total: 20, online: 10, color: "#FF8C58" },
            { isEnable: true, orgCode: "1001", orgId: 1, orgParentId: 0, avatar: "/user.png", orgName: "集团办公室", orgManagerName: "李四", total: 20, online: 10, color: "#2FDD93" },
            { isEnable: true, orgCode: "1001001", orgId: 2, orgParentId: 1, avatar: "/user.png", orgName: "党委办公室", orgManagerName: "王五", total: 20, online: 10, color: "#19ADE6" },
            { isEnable: true, orgCode: "1001002", orgId: 3, orgParentId: 1, avatar: "/user.png", orgName: "党委办公室", orgManagerName: "王五", total: 20, online: 10, color: "#19ADE6" },
            { isEnable: true, orgCode: "1001002", orgId: 4, orgParentId: 1, avatar: "/user.png", orgName: "党委办公室", orgManagerName: "王五", total: 20, online: 10, color: "#19ADE6" },
            { isEnable: true, orgCode: "1001002", orgId: 5, orgParentId: 1, avatar: "/user.png", orgName: "党委办公室", orgManagerName: "王五", total: 20, online: 10, color: "#19ADE6" },
            { isEnable: true, orgCode: "1001002", orgId: 6, orgParentId: 1, avatar: "/user.png", orgName: "党委办公室", orgManagerName: "王五", total: 20, online: 10, color: "#19ADE6" },
            { isEnable: false, orgCode: "1001002", orgId: 7, orgParentId: 1, avatar: "/user.png", orgName: "党委办公室", orgManagerName: "王五", total: 20, online: 10, color: "#19ADE6" },
        ]

        return list;
    }


}

export interface IService extends ServiceMock { }
