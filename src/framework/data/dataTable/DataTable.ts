 

 
 
  export interface IDataTableRow {
    id: string;
    name: string;
    disabled?: boolean;
    children?: IDataTableRow[];
}
/** 记录表 */
export class DataTable {
    /** 记录集合 */
    public get rows(): IDataTableRow[] {
        return this.mRows;
    }

    private static setIds(ids: string[], rows: IDataTableRow[], findLevel: number): void {
        if (findLevel <= 0) {
            return;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const id = row.id;
            ids.push(id);
            if (row.children != null) {
                DataTable.setIds(ids, row.children, findLevel - 1);
            }
        }
    }

    private static getByIdOnRows<T>(onRows: IDataTableRow[], findId: string): IDataTableRow | undefined {
        for (const row of onRows) {
            if (row.id === findId) {
                return row;
            }
            if (row.children) {
                const childrenRow = DataTable.getByIdOnRows(row.children, findId);
                if (childrenRow) {
                    return childrenRow;
                }
            }
        }
        return undefined;
    }

    private static deleteByIdOnRows<T>(onRows: IDataTableRow[], id: string): boolean {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < onRows.length; i++) {
            const row = onRows[i];
            if (row.id === id) {
                onRows.splice(i, 1); // 删除
                return true;
            }
            if (row.children) {
                const isOK = DataTable.deleteByIdOnRows(row.children, id);
                if (isOK) {
                    return true;
                }
            }
        }
        return false;
    }

    private static updateByIdOnRows<T>(onRows: IDataTableRow[], updateRow: IDataTableRow): boolean {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < onRows.length; i++) {
            const row = onRows[i];
            if (row.id === updateRow.id) {
                onRows.splice(i, 1, updateRow); // 置换
                return true;
            }
            if (row.children) {
                const isOk = DataTable.updateByIdOnRows(row.children, updateRow);
                if (isOk) {
                    return true;
                }
            }
        }
        return false;
    }

    private static removeNullChildren<T>(onRows: IDataTableRow[]) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < onRows.length; i++) {
            const row = onRows[i];
            if (row.children === undefined) {
                continue;
            }
            if (row.children instanceof Array === false) {
                continue;
            }
            if (row.children.length === 0) {
                row.children = undefined;
                continue;
            }
            DataTable.removeNullChildren(row.children);
        }
    }

    private static filtrateToRemoveOnRows = <T>(
        oldRows: IDataTableRow[] | undefined,
        searchValue: string,
        fieldNames: string[]
    ): IDataTableRow[] => {
        const findRows = new Array<IDataTableRow>();
        if (!oldRows) {
            return findRows;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < oldRows.length; i++) {
            const oldRow = oldRows[i];
            const findRow = DataTable.getRowByLike(oldRow, searchValue, fieldNames);
            if (findRow) {
                findRows.push(findRow);
            }
        }
        return findRows;
    };

    private static getRowByLike = <T>(
        oldRow: IDataTableRow,
        searchValue: string,
        fieldNames: string[]
    ): IDataTableRow | undefined => {
        let likeRow: IDataTableRow | undefined;
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < fieldNames.length; j++) {
            const fieldName = fieldNames[j];
            const cellValue = oldRow[fieldName];
            const isFind = cellValue.includes(searchValue);

            if (isFind) {
                likeRow = { ...oldRow };
                likeRow.children = undefined;
                break;
            }
        }

        const findChildren = DataTable.filtrateToRemoveOnRows(oldRow.children, searchValue, fieldNames);
        if (likeRow === undefined && findChildren.length === 0) {
            return undefined;
        }
        if (likeRow !== undefined && findChildren.length === 0) {
            return likeRow;
        }

        likeRow = { ...oldRow };
        likeRow.children = findChildren;
        return likeRow;
    };

    private mRows: IDataTableRow[] = new Array<IDataTableRow>();

    public constructor(rows: IDataTableRow[]) {
        const newRows = [...rows];
        DataTable.removeNullChildren(newRows);
        this.mRows = newRows;
    }

    public subRows(beginIndex: number, num: number) {
        this.mRows = this.mRows.slice(beginIndex, beginIndex + num);
    }

    /** 添加到顶部 */
    public addTop(newRow: IDataTableRow) {
        this.mRows = [newRow, ...this.rows];
    }

    /** 添加到底部 */
    public add(newRow: IDataTableRow) {
        this.mRows.push(newRow);
    }

    public removeBottomRow() {
        this.mRows.pop();
    }

    public getBottomRow(): IDataTableRow {
        return this.mRows[this.mRows.length - 1];
    }

    public getNextRow(id: string): IDataTableRow | undefined {
        for (let i = 0; i < this.mRows.length - 1; i++) {
            const row = this.mRows[i];
            if (row.id === id) {
                return this.mRows[i + 1];
            }
        }

        return undefined;
    }

    /** 添加子记录 */
    public addChild(parentRowId: string, newChildRow: IDataTableRow): void {
        const parentRow: IDataTableRow = this.getById(parentRowId);
        if (!parentRow.children) {
            parentRow.children = new Array<IDataTableRow>();
        }
        parentRow.children.push(newChildRow);
    }

    /** 更新置换 */
    public update(updateRow: IDataTableRow) {
        const row = this.getById(updateRow.id);
        Object.assign(row, updateRow);
    }

    /** 删除 */
    public delete(id: string) {
        const isOk = DataTable.deleteByIdOnRows(this.mRows, id);
        if (isOk === false) {
            throw new Error("找不到Row, deleteRowId=" + id);
        }
    }

    /** 是否存在 */
    public isExist(id: string): boolean {
        const row = DataTable.getByIdOnRows(this.rows, id);
        if (row) {
            return true;
        }
        return false;
    }

    /** 获取 */
    public getById(id: string): IDataTableRow {
        const row = DataTable.getByIdOnRows(this.rows, id);
        if (row) {
            return row;
        }
        throw new Error("找不到Row, RowId=" + id);
    }

    public getAllIds(getlevel: number = 1000): string[] {
        const ids = Array<string>();

        DataTable.setIds(ids, this.mRows, getlevel);

        return ids;
    }

    /** 批量获取 */
    public getByIds(ids: string[]): IDataTableRow[] {
        const findRows = new Array<IDataTableRow>();
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const row = DataTable.getByIdOnRows(this.rows, id);
            if (row) {
                findRows.push(row);
            }
        }
        return findRows;
    }

    /** 上移，不支持树 */
    public moveUpByIds = (upIds: string[]) => {
        upIds.forEach(upId => {
            this.moveUpById(upId);
        });
    };

    /** 上移 */
    public moveUpById = (upId: string) => {
        for (let i = 0; i < this.mRows.length; i++) {
            const row = this.mRows[i];
            if (row.id !== upId) {
                continue;
            }
            if (i === 0) {
                break;
            }
            const preRow = this.mRows[i - 1];
            const currentRow = this.mRows[i];
            this.mRows[i - 1] = currentRow;
            this.mRows[i] = preRow;
            break;
        }
    };

    /** 下移 */
    public moveDownByIds = (dowmIds: string[]) => {
        dowmIds.forEach(upId => {
            this.moveDownById(upId);
        });
    };

    /** 下移 */
    public moveDownById = (dowmId: string) => {
        for (let i = 0; i < this.mRows.length; i++) {
            const row = this.mRows[i];
            if (row.id !== dowmId) {
                continue;
            }
            if (i === this.mRows.length - 1) {
                break;
            }
            const nextRow = this.mRows[i + 1];
            const currentRow = this.mRows[i];
            this.mRows[i + 1] = currentRow;
            this.mRows[i] = nextRow;
            break;
        }
    };

    /** 筛选记录=》移除不符合条件的记录 */
    public filtrateToRemove = (searchValue: string, fieldNames: string[]) => {
        if (!searchValue) {
            return;
        }
        if (searchValue.trim().length === 0) {
            return;
        }
        const newRows = DataTable.filtrateToRemoveOnRows(this.mRows, searchValue, fieldNames);
        this.mRows = newRows;
    };

 
}
