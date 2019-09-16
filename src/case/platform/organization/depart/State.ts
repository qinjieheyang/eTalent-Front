// import * as Framework from 'src/framework/Framework';

export interface ITreeBase {
    // id: string; //key
    // name: string; //title
    // icon?: string;
    // disabled?: boolean;
    // selectable?: boolean;
    // isLeaf?: boolean;
    // children?: ITreeBase[];

    companyId: number;
    createTime?: string;
    isEnable: boolean; //是否封存
    operatorId: number;
    orgCode: string; //机构编码
    orgFullname: string; //机构全称
    orgId: number; //机构ID
    orgManagerId: number; //机构负责人
    orgName: string; //机构名称
    orgParentId: number; //父级机构ID
    orgType: string;  //机构类型
    sortId: number; //序号
    childList?: ITreeBase[]; //子级机构
}

export interface IState {
    treeData: ITreeBase[];
    tableData: any[];
    currOrgId: number;
    isEnable: boolean;
    currentPage: number;
    pageSize: number;
}

export const initState = {
    treeData: [],
    tableData: [],
    currOrgId: 0,
    isEnable: false,
    currentPage: 1,
    pageSize: 10
};

export interface IFieldVos {
    fieldName: string;
    fieldValue?: string;
    isAscSort?: boolean;
    isFilterNull?: boolean;
}

export interface ITableParam {
    orgParentId: number;
    isEnable: boolean;
    currentPage: number;
    pageSize: number;
    querFieldVos?: IFieldVos[];
}