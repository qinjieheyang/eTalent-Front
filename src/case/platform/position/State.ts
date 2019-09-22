export interface IState {
    PS_columnCollection: any[]; //职位体系列数据集
    PS_dataCollection: any[]; //职位体table data数据集
    openKeys: string[];
    tabKey: string;
};

export const initState= {
    PS_columnCollection: [],
    PS_dataCollection: [],
    openKeys: ["sub1"],
    tabKey: "group"
};