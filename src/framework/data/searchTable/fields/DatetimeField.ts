import { AField, CompareType } from "./AField";

export class DatetimeField extends AField {
    public DataType = "date";
    public getFindFunc(): (row: any) => boolean {
        const func = (row: object): boolean => {
            const val = row[this.name];

            if (val instanceof Date === false) {
                throw new Error("row[ " + this.name + "]不是Date类型，" + typeof row[this.name]);
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

            if (this.compare === CompareType.LessThanEqual) {
                if (val <= this.searchValue) {
                    return true;
                }
                return false;
            }
            if (this.compare === CompareType.GreateThan) {
                if (val > this.searchValue) {
                    return true;
                }
                return false;
            }

            if (this.compare === CompareType.LessThan) {
                if (val < this.searchValue) {
                    return true;
                }
                return false;
            }
            throw new Error("Date类型只能大于、小于、等于匹配");
        };

        return func;
    }
}
