export interface IMessageRow {
    id: string;
    title: string;
    remark: string;
}

export interface IState {
    msgRows: IMessageRow[];
    topUrl: string;
}

export const initState: IState = {
    msgRows: [],
    topUrl: ''
};
