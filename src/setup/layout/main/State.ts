export interface IMessageRow {
    id: string;
    title: string;
    remark: string;
}

export interface IState {
    msgRows: IMessageRow[];
}

export const initState: IState = {
    msgRows: []
};
