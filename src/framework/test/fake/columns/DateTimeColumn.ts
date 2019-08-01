import { AColumn } from "../AColumn";

export class DateTimeColumn extends AColumn {
    public min: Date = new Date(1975, 1, 1);
    public max: Date = new Date(2020, 1, 1);
    public addMilliseconds = 1000 * 60 * 60 * 24; // 默认天为单位

    private nextValue: Date;

    public make = (index: number): any => {
        if (this.nextValue === undefined) {
            this.nextValue = this.min;
        }

        const ms = this.nextValue.getTime() + this.addMilliseconds;
        this.nextValue = new Date(ms);
        return this.nextValue;
    };
}
