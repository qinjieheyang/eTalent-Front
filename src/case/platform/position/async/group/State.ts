export interface IState {
    currentPage: number;
    pageSize: number;
    total: number;
    tableData: any[];
    visibleAdd: boolean;
    visibleDelete: boolean;
    confirmLoading: boolean;
    addModalTitle?: string;
};

export const initState = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    tableData: [],
    visibleAdd: false,
    visibleDelete: false,
    confirmLoading: false,
    addModalTitle: undefined
};

export interface ITableParam {
    currentPage: number;
    pageSize: number;
}