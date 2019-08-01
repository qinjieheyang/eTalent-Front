 
import { IColumn } from "./AColumn";

import { BoolColumn } from "./columns/BoolColumn";
import { DateTimeColumn } from "./columns/DateTimeColumn";

import { FkArrayColumn } from "./columns/FkArrayColumn";
import { FkColumn } from "./columns/FkColumn";
import { IntColumn } from "./columns/IntColumn";

import { NumberColumn } from "./columns/NumberColumn";

import { StringColumn } from "./columns/StringColumn";

/** 记录伪造工厂基类 */
export abstract class RowsFakeFactoryBase {
    protected columns = new Array<IColumn>();
    protected rowIndex: number = 0;

    public addDateTime(
        title: string,
        name: string,
        min = new Date(1975, 1, 1),
        max: Date = new Date(2020, 1, 1),
        addMilliseconds = 1000 * 60 * 60 * 24
    ): DateTimeColumn {
        const c = new DateTimeColumn();
        c.title = title;
        c.name = name;
        c.min = min;
        c.max = max;
        c.addMilliseconds = addMilliseconds;
        this.columns.push(c);
        return c;
    }

    public addIntColumn(title: string, name: string, min = 0, max = 100): IntColumn {
        const c = new IntColumn();
        c.title = title;
        c.name = name;
        c.min = min;
        c.max = max;
        this.columns.push(c);
        return c;
    }

    public addNumberColumn(title: string, name: string, min = 0, max = 100, decimalPlace = 2): NumberColumn {
        const c = new NumberColumn();
        c.title = title;
        c.name = name;
        c.min = min;
        c.max = max;
        c.decimalPlace = decimalPlace;
        this.columns.push(c);
        return c;
    }

    public addFkColumn(title: string, name: string, maxId: number = 11): FkColumn {
        const c = new FkColumn();
        c.title = title;
        c.name = name;
        c.maxId = maxId;
        this.columns.push(c);
        return c;
    }

    public addFkArrayColumn(title: string, name: string, maxId: number = 11): FkColumn {
        const c = new FkArrayColumn();
        c.title = title;
        c.name = name;
        c.maxId = maxId;
        this.columns.push(c);
        return c;
    }

    public addStringColumn(title: string, name: string): StringColumn {
        const c = new StringColumn();
        c.title = title;
        c.name = name;
        this.columns.push(c);
        return c;
    }

    public addBoolColumn(title: string, name: string): StringColumn {
        const c = new BoolColumn();
        c.title = title;
        c.name = name;
        this.columns.push(c);
        return c;
    }

    public addCustom(c: IColumn): IColumn {
        this.columns.push(c);
        return c;
    }

    protected setRow(row: any, index: number): void {
        this.columns.forEach(c => {
            row[c.name] = c.make(index);
        });
    }
}
