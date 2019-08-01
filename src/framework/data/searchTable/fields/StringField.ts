import { AField, CompareType } from "./AField";

export class StringField extends AField {
    public DataType = "string";
    public getFindFunc(): (row: any) => boolean {
        const func = (row: object): boolean => {
            const val = row[this.name];

            if (typeof val !== "string") {
                throw new Error("row[ " + this.name + "]不是文本类型，" + typeof row[this.name]);
            }

            if (this.compare === CompareType.Equal) {
                if (val === this.searchValue) {
                    return true;
                }
                return false;
            }

            const isOk = val.indexOf(this.searchValue) >= 0;
            return isOk;
        };

        return func;
    }
}
