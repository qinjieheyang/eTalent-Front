import { AField, CompareType } from "./AField";
import { BoolField } from "./BoolField";
import { DatetimeField } from "./DatetimeField";
import { NumberField } from "./NumberField";
import { StringField } from "./StringField";

export class FieldFacotry {
    private searchDto: any;
    private map = new Map<string, AField>();
    private fields = new Array<AField>();
    public constructor(searchDto: any) {
        if (!searchDto) {
            throw new Error("searchDto不能为空");
        }
        this.searchDto = searchDto;
        this.ini();
    }

    /** 方便测试暴露的接口 */
    public getFields(): AField[] {
        return this.fields;
    }

    /** 方便测试暴露的接口 */
    public getField(name: string): AField {
        const f = this.map.get(name);
        if (f === undefined) {
            throw new Error("找不到fieldName:" + name);
        }
        return f;
    }

    public getFindFuncs(): Array<(row: object) => boolean> {
        const findFuncs = new Array<(row: object) => boolean>(this.getFields.length);
        for (const f of this.fields) {
            findFuncs.push(f.getFindFunc());
        }
        return findFuncs;
    }

    private ini(): void {
        for (const propName in this.searchDto) {
            if (propName === "内置属性或方法") {
                continue;
            }
            const searchVal = this.searchDto[propName];
            if (searchVal === undefined) {
                continue;
            }
            if (searchVal === null) {
                continue;
            }
            if (searchVal === "") {
                continue;
            }

            if (typeof searchVal === "string") {
                const ct = getCompareType(propName);
                const name = getPropertyName(propName);

                const f = new StringField(name, searchVal, ct);
                this.map.set(f.name, f);
                this.fields.push(f);
            }
            if (typeof searchVal === "number") {
                const ct = getCompareType(propName);
                const name = getPropertyName(propName);
                const f = new NumberField(name, searchVal, ct);
                this.map.set(f.name, f);
                this.fields.push(f);
            }
            if (typeof searchVal === "boolean") {
                const name = getPropertyName(propName);
                const f = new BoolField(name, searchVal, CompareType.Equal);

                this.map.set(f.name, f);
                this.fields.push(f);
            }
            if (searchVal instanceof Date) {
                const ct = getCompareType(propName);
                const name = getPropertyName(propName);
                const f = new DatetimeField(name, searchVal, ct);
                this.map.set(f.name, f);
                this.fields.push(f);
            }
        }
    }
}

function getPropertyName(propName: string): string {
    return propName
        .replace("_gt", "")
        .replace("_lt", "")
        .replace("_gte", "")
        .replace("_lte", "")
        .replace("_like", "");
}

function getCompareType(propName: string): CompareType {
    if (propName.indexOf("_gte") > 1) {
        return CompareType.GreateThanEqual;
    }
    if (propName.indexOf("_lte") > 1) {
        return CompareType.LessThanEqual;
    }

    if (propName.indexOf("_gt") > 1) {
        return CompareType.GreateThan;
    }
    if (propName.indexOf("_lt") > 1) {
        return CompareType.LessThan;
    }
    if (propName.indexOf("_like") > 1) {
        return CompareType.Like;
    }
    return CompareType.Equal;
}
