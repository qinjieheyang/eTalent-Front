export interface IChecked {
    value: string;
    name: string;
}

export interface IState {
    currentPage: number;
    pageSize: number;
    total: number;
    tableData: any[];
    visibleAdd: boolean;
    visibleDelete: boolean;
    confirmLoading: boolean;
    addModalTitle?: string;
    checkedList: IChecked[];
    checkedValues: any[];
}

export const initState = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    tableData: [],
    visibleAdd: false,
    visibleDelete: false,
    confirmLoading: false,
    addModalTitle: undefined,
    checkedList: [],
    checkedValues: []
};

export interface ITableParam {
    currentPage: number;
    pageSize: number;
}