import { ATreeConvert } from "./ATreeConvert";
import { ConvertParentIdTable, IRowParentId } from "./ConvertParentIdTable";
import { ConvertTable, IRowTable } from "./ConvertTable";

/** 树转换工厂 */
export class TreeConvertFactory {
    public static topTable(type: string, rows: IRowTable[], isDisable: boolean = false): TreeConvertFactory {
        const thisConvert = new ConvertTable(type, rows);
        return new TreeConvertFactory(thisConvert);
    }

    public static topParentIdTable(
        type: string,
        rows: IRowParentId[],
        // joinFieldName?: string,
        isDisable: boolean = false
    ): TreeConvertFactory {
        return new TreeConvertFactory(new ConvertParentIdTable(type, rows, undefined, isDisable));
    }

    private thisConvert: ATreeConvert;

    public constructor(treeConvert: ATreeConvert) {
        this.thisConvert = treeConvert;
    }

    public getConvert() {
        return this.thisConvert;
    }
    public joinTable(
        type: string,
        rows: IRowTable[],
        joinFieldName?: string,
        isDisable: boolean = false
    ): TreeConvertFactory {
        const nextConvert = new ConvertTable(type, rows, joinFieldName, isDisable);
        nextConvert.Pre = this.thisConvert;
        const nextFactory = new TreeConvertFactory(nextConvert);
        return nextFactory;
    }

    public joinParentIdTable(
        type: string,
        rows: IRowTable[],
        joinFieldName?: string,
        isDisable: boolean = false
    ): TreeConvertFactory {
        const nextConvert = new ConvertParentIdTable(type, rows, joinFieldName, isDisable);
        nextConvert.Pre = this.thisConvert;
        const nextFactory = new TreeConvertFactory(nextConvert);
        return nextFactory;
    }
}
