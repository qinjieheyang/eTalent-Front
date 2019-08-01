export interface ICodeRow {
    id: string;
    name: string;
    children?: ICodeRow[];
    disabled: boolean;
}

/** 代码表 */
export default class CodeTable {
    public readonly TableId: string;
    public readonly TableName: string;
    public readonly Code: string;
    public readonly CodeDepth: number;
    public readonly IsOnlySelectLeafNode: boolean;
    public readonly IsUsable: boolean;

    public IsTree: boolean;
    public readonly rowMap = new Map<string, ICodeRow>();
    public readonly topRows: ICodeRow[] = [];
    public LevelCount = 0;
    public readonly LastModfiyTime: Date;

    public constructor(tableDto?: any) {
        if (tableDto == null) {
            return;
        }
        this.TableId = tableDto.id;
        this.TableName = tableDto.name;
        this.Code = tableDto.code;
        if (this.Code === "codedefine") {
            // 临时保留
        }
        this.CodeDepth = tableDto.codeDepth;
        this.IsOnlySelectLeafNode = tableDto.isOnlySelectLeafNode;
        this.IsUsable = tableDto.isUsable;
        this.LastModfiyTime = tableDto.lastModfiyTime;

        this.iniTopRows(tableDto.codeItems);
        this.iniAllRowMap(tableDto.codeItems);
    }

    public setOnlySelectLeafNode = () => {
        for (const row of this.topRows) {
            this.setOnlySelectLeafNodeOnRow(row);
        }
    };

    /** 通过Id获取名称 */
    public GetNameById = (id: string) => {
        if (!id) {
            return "";
        }

        const row = this.rowMap.get(id);
        if (row == null) {
            return ":" + id;
            // throw new Error(`通过id=(${id})无法找到Name,在CodeTable：${this.TableName}`);
        }

        return row.name;
    };

    public GetRowById = (id: string): ICodeRow => {
        if (!id) {
            throw new Error("在[" + this.TableName + "]，通过id不能为空");
        }

        const row = this.rowMap.get(id);
        if (row == null) {
            throw new Error("在[" + this.TableName + "]，GetRowById(" + id + ")，找不到Row");
        }

        return row;
    };

    public IsExistById = (id: string) => {
        const row = this.rowMap.get(id);
        if (row == null) {
            return false;
        }
        return true;
    };

    /** 获取全部记录（支持树） */
    public GetTopRows = (): ICodeRow[] => {
        return this.topRows;
    };

    /** 获取第一条记录（如果没有抛出异常） */
    public GetFirstItem = () => {
        if (this.topRows.length <= 0) {
            throw new Error(this.TableName + "记录数不能为0");
        }
        return this.topRows[0];
    };

    private setOnlySelectLeafNodeOnRow = (row: ICodeRow) => {
        if (!row.children) {
            return;
        }
        if (row.children.length === 0) {
            return;
        }
        row.disabled = true;
        for (const childRow of row.children) {
            this.setOnlySelectLeafNodeOnRow(childRow);
        }
    };

    private iniTopRows = (rowDtos = []) => {
        for (const rowDto of rowDtos) {
            this.topRows.push(rowDto);
        }
    };

    private iniAllRowMap = (topRowDtos: ICodeRow[] = []) => {
        if (this.LevelCount > 10) {
            throw Error("代码项树层次超过了10次！");
        }
        for (const topRowDto of topRowDtos) {
            const itemDto: ICodeRow = topRowDto;
            this.rowMap[itemDto.id] = itemDto;
            if (itemDto.children) {
                if (itemDto.children.length > 0) {
                    this.IsTree = true;
                }
                this.LevelCount = this.LevelCount + 1;
                this.iniAllRowMap(itemDto.children);
                this.LevelCount = this.LevelCount - 1;
            }
        }
    };
}
