// import * as Framework from 'src/framework/Framework';

export interface ITreeBase {
    id: string; //key
    name: string; //title
    icon?: string;
    disabled?: boolean;
    selectable?: boolean;
    isLeaf?: boolean;
    children?: ITreeBase[];
}

export interface IState {
    treeData: Array<ITreeBase>;
}

export const initState= { 
    treeData:[]
    // loaded: false
};
