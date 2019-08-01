import { AColumn } from "../AColumn";

export class NumberColumn extends AColumn {
    public min: number = 0;
    public max = 100;

    public decimalPlace = 2;

    public make = (index: number): any => {
        const length = this.max - this.min;

        const randomValue = index % length;
        const val = this.min + randomValue / (this.decimalPlace * 10);

        return val;
    };
}
