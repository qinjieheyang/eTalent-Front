export interface IMessageRow {
    id: string;
    title: string;
    remark: string;
}

export interface IState {
    msgRows: IMessageRow[];
    topUrl: string;
    sideCollapsed: boolean;
}

export const initState: IState = {
    msgRows: [],
    topUrl: '',
    sideCollapsed: false
};
