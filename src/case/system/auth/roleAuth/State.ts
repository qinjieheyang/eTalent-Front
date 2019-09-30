// import * as Framework from 'src/framework/Framework';

export interface ITreeBase {

    companyId: string;
    createTime?: string;
    isEnable: boolean; //是否封存
    operatorId: string;
    orgCode: string; //机构编码
    orgFullname: string; //机构全称
    orgId: string; //机构ID
    orgManagerId: string; //机构负责人
    orgName: string; //机构名称
    orgParentId: number; //父级机构ID
    orgType: string;  //机构类型
    sortId: number; //序号
    childList?: ITreeBase[]; //子级机构
}

export interface IState {
    currOrgId: string | undefined;
    currOrgCode: string | undefined;
    treeData: ITreeBase[];
    selectedKeys: string[];
    isEnable: boolean;
    tabKey: string;
}

export const initState: IState = {
    currOrgId: undefined,
    currOrgCode: undefined,
    treeData: [],
    selectedKeys: [],
    isEnable: false,
    tabKey: "tab-4"
};
