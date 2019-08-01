import { AColumn } from "../AColumn";

export class IntColumn extends AColumn {
    public min: number = 0;
    public max = 100;

    public make = (index: number): any => {
        const length = this.max - this.min;

        return this.min + (index % length);
    };
}
