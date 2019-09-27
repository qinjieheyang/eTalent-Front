// import * as Framework from 'src/framework/Framework';

export interface IState {
    
    treeData: any[];
    selectedKeys: string[];
    expandedKeys: string[];
    tabKey: string;
}

export const initState: IState = {
    
    treeData: [],
    selectedKeys: [],
    expandedKeys: [],
    tabKey: "tab-1"
};
