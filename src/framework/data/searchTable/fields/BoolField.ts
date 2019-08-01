import { AField, CompareType } from "./AField";

export class BoolField extends AField {
    public DataType = "boolean";
    public getFindFunc(): (row: any) => boolean {
        const func = (row: object): boolean => {
            const val = row[this.name];
            if (typeof val !== "boolean") {
                throw new Error("row[ " + this.name + "]不是boolean类型，" + typeof row[this.name]);
            }

            if (this.compare === CompareType.Equal) {
                if (val === this.searchValue) {
                    return true;
                }
                return false;
            }

            if (this.compare === CompareType.GreateThanEqual) {
                if (val >= this.searchValue) {
                    return true;
                }
                return false;
            }

            throw new Error("boolean类型只能等于匹配");
        };

        return func;
    }
}
