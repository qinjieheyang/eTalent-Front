// State描述Case的数据模型
export interface IMonthData {
    projectCount: number;
    projectMoney: number;
    monthIncrease: number;
    yearIncrease: number;
}

export interface IState {
    meMonthData: IMonthData;
    // meYearData: IMonthData;
    // statistics: {};
}

export const initState: IState = {
    meMonthData: { projectCount: 0, projectMoney: 0, monthIncrease: 0, yearIncrease: 0 }
};
