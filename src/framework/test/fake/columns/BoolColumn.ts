import { AColumn } from "../AColumn";

export class BoolColumn extends AColumn {
    public make = (index: number): any => {
        return index % 2 === 0;
    };
}
