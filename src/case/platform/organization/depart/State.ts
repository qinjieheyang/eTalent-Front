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
    currOrgId: string|undefined;
    currOrgCode: string|undefined;
    treeData: ITreeBase[];
    tableData: any[];
    orgFlowData: any[];
    selectedKeys: string[];
    isEnable: boolean;
    currentPage: number;
    pageSize: number;
    total: number;
    visibleAdd: boolean;
    visibleDelete: boolean;
    visibleSeal: boolean; //封存
    visibleUnSeal: boolean; //解封
    visibleMerge: boolean;
    visibleImport: boolean;
    confirmLoading: boolean;
    orgAngle: number;
}

export const initState: IState = {
    currOrgId: undefined,
    currOrgCode: undefined,
    treeData: [],
    tableData: [],
    orgFlowData: [],
    selectedKeys: [],
    isEnable: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    visibleAdd: false,
    visibleDelete: false,
    visibleSeal: false,
    visibleUnSeal: false,
    visibleMerge: false,
    visibleImport: false,
    confirmLoading: false,
    orgAngle: 90
};

export interface IFieldVos {
    fieldName: string;
    fieldValue?: string;
    isAscSort?: boolean;
    isFilterNull?: boolean;
}

export interface ITableParam {
    orgParentId: string | undefined;
    isEnable: boolean;
    currentPage: number;
    pageSize: number;
    querFieldVos?: IFieldVos[];
}