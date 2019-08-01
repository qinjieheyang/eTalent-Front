//  负责伪造后端 WebApi数据

import { IState } from "./State";

export class ServiceMock {
    public constructor() {}

    // 数据初始化
    public getInit = async (): Promise<{
        initData: IState;
    }> => {
        const initData: IState = {
            meMonthData: { projectCount: 11, projectMoney: 11110, monthIncrease: 10, yearIncrease: 2 }
        };
        return { initData };
    };
}

export interface IService extends ServiceMock {}
