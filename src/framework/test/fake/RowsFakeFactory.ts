 

import { RowsFakeFactoryBase } from "./RowsFakeFactoryBase";
 



export interface IRow {
    id: string;
    name: string;
    disabled?: boolean;
    children?: IRow[];
}

/** 记录伪造工厂 */
export class RowsFakeFactory extends RowsFakeFactoryBase {


    public createRow(): IRow {
        const id: string = "ID-" + (this.rowIndex + 1);

        const row: any = { id };
        this.setRow(row, this.rowIndex);
        return row;
    }

    public createRows(rowCount: number, treeLevelCount: number = 0): IRow[] {
        const rows = new Array<IRow>();
        for (let i = 0; i < rowCount; i++) {
            this.rowIndex++;
            const idText = "ID-" + this.rowIndex;
            const row: any = { id: idText };
            this.setRow(row, this.rowIndex);
            row.children = this.createTreeChildRows(idText, 3, treeLevelCount - 1);
            rows.push(row);
        }
        return rows;
    }

    private createTreeChildRows(parentId: string, rowCount: number, treeLevelCount: number): IRow[] | undefined {
        if (treeLevelCount <= 0) {
            return undefined;
        }
        const rows = new Array<IRow>();
        for (let i = 0; i < rowCount; i++) {
            this.rowIndex++;
            const idText = "ID-" + this.rowIndex;
            const row: any = { id: idText };
            this.setRow(row, this.rowIndex);
            row.children = this.createTreeChildRows(idText, 3, treeLevelCount - 1);
            rows.push(row);
        }
        return rows;
    }
}
