// import * as Framework from 'src/framework/Framework';

export interface IState {
    
    treeData: any[];
    selectedKeys: string[];
    tabKey: string;
    isLoaded: boolean;
}

export const initState: IState = {
    
    treeData: [],
    selectedKeys: [],
    tabKey: "tab-1",
    isLoaded: false
};
