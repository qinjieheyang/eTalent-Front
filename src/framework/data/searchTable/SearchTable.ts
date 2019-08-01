import { Paging } from 'src/framework/case/model/Struct';
import { UtilLog } from "../../utils/UtilLog";
import { FieldFacotry } from "./fields/FieldFacotry";


interface IRow{
    id:string ;
    name:string ;
    children?:IRow[];
}

/** 组合查询单表记录 */
export class SearchTable {
    private rows: any[];

    public constructor(rows: any[]) {
        if (rows instanceof Array) {
            this.rows = rows;
            return;
        }

        throw new Error("SearchTable.构造方法接受参数[rows]非Array类型,rows实际类型=" + typeof rows);
    }

    /** 筛选记录=》移除不符合条件的记录 */
    public search = (searchDto: any): IRow[] => {
        UtilLog.group("前端查询-Search-Begin ：", searchDto);

        const rows = this.search2(searchDto);
        UtilLog.info("---获取记录数 ：", rows.length);
        UtilLog.groupEnd();
        return rows;
    };

    public getRowCountBySearch = (searchDto: any): number => {
        if (!searchDto) {
            throw new Error("searchDto不能为空");
        }
        const factory = new FieldFacotry(searchDto);
        const funcs = factory.getFindFuncs();

        const getRows = new Array<IRow>();

        fills(getRows, this.rows, funcs);

        return getRows.length;
    };

    /** 筛选记录=》移除不符合条件的记录 */
    private search2 = (searchDto: any): IRow[] => {
        if (!searchDto) {
            throw new Error("searchDto不能为空");
        }
        const factory = new FieldFacotry(searchDto);
        const funcs = factory.getFindFuncs();

        const getRows = new Array<IRow>();
        fills(getRows, this.rows, funcs);

        if (searchDto.pager === undefined) {
            return getRows;
        }
        const pager: Paging = searchDto.pager;
        const begin = pager.page * pager.size - pager.size;
        const end = pager.page * pager.size;
        if (begin < 0) {
            throw new Error("分页不能大于边界");
        }

        if (end > getRows.length - 1) {
            return getRows.slice(begin, getRows.length - 1);
        }

        return getRows.slice(begin, end);
    };
}

function fills(getRows: IRow[], findRows: IRow[], funcs: Array<(row: object) => boolean>): void {
    for (const findRow of findRows) {
        // children,不存在情况
        if (findRow.children === undefined) {
            const isOk = isRow(findRow, funcs);

            if (isOk) {
                getRows.push(findRow);
            }

            continue;
        }

        // children,存在情况
        if (findRow.children !== undefined) {
            const getChildRows = new Array<IRow>();
            fills(getChildRows, findRow.children, funcs);

            if (getChildRows.length > 0) {
                const cRow = cloneRow(findRow);
                cRow.children = getChildRows;
                getRows.push(cRow);
                continue;
            }

            const isOk = isRow(findRow, funcs);
            if (isOk) {
                const cRow = cloneRow(findRow);
                getRows.push(cRow);
            }
        }
    }
}

function isRow(findRow: IRow, funcs: Array<(row: object) => boolean>): boolean {
    for (const func of funcs) {
        const isOk = func(findRow);

        if (isOk === false) {
            return false;
        }
    }

    return true;
}

function cloneRow(row: IRow): IRow {
    const newRow = { ...row };
    newRow.children = undefined;
    return newRow;
}
