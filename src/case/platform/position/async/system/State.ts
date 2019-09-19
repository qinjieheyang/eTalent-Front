export interface IState {
    showType: string;
    tableData: any[];
    columns: any[];
};

export const initState: IState = {
    showType: "1",
    tableData: [],
    columns: []
};