// ----------------------------------------------------

export interface IRowBase {
    id: string;
    name: string;
    disabled?: boolean;
    children?: IRowBase[];
}

/** 分页 */
export interface IPaging {
    size: number;
    page: number;
}

/** 分页容器 */
export interface IPagingContainer {
    paper: IPaging;
}

/** 分页 */
export class Paging implements IPaging {
    public size: number = 10;
    public page: number = 1;
}

/** 初始化选择表 */
export interface IBaseTable {
    code: string;
    items: IRowBase[];
}

export interface IBaseTablesContainer {
    baseTables: any;
}

// ===============================================================
// --------------------------  组合  -----------------------------

/** 前端分页、前端模糊查询 */
export interface IModelTableCurd {
    baseTables?: any;
    rows: any[]; // 全部记录
    displayRows: any[]; // 筛选显示记录
    creatingRow?: object;
    editingRow?: object;
    findValue?: string;
}

/** 后端分页 */
export interface IModelTablePageCurd {
    rows: any[]; // 全部记录

    rowTotal: number;
    creatingRow?: object;
    editingRow?: object;
    isDisplaySearchForm: boolean;
    searchDto: any;
}

/** 树表 */
export interface ITree {
    rows: IRowBase[];
    displayRows: IRowBase[];

    searchValue?: string;
    expandRowKeys: string[];
}

/** 树表 - (带新增、编辑) */
export interface IModelTreeTableCurd extends ITree {
    creatingRow?: IRowBase;
    editingRow?: IRowBase;
}

/** 树表 - (带新增、编辑) */
export interface IModelLogin {
    loginName: string;
    password: string;
    isLogin: boolean;

    username: string;
    roles: any[];
    menus: any[];
}

export interface IModelSearchTree {
    allRows: IRowBase[];
    displayRows: IRowBase[];
    searchValue?: string;
    expandIds?: string[];
    selectId?: string;
    selectName?: string;
    selectRow?: any;
    checkIds: string[];
}

// tslint:disable-next-line:max-classes-per-file
export class ModelSearchTree implements IModelSearchTree {
    public allRows: IRowBase[] = [];
    public displayRows: IRowBase[] = [];
    public searchValue?: string;
    public expandIds?: string[];
    public selectId?: string;
    public selectName?: string;
    public selectRow?: any;
    public checkIds: string[] = [];
}
