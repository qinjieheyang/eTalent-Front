import { AColumn } from "../AColumn";

export class StringColumn extends AColumn {
    public make = (index: number): any => {
        return this.title + "_" + index;
    };
}
