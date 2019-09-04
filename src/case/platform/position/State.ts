export interface IState {
    positionType: number;
    columns: any[];
    data: any[];
};

export const initState= {
    positionType: 0,
    columns: [],
    data: []
};