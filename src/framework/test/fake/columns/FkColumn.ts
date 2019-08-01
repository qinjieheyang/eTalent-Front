import { AColumn } from "../AColumn";

export class FkColumn extends AColumn {
    public maxId = 10;

    public make = (index: number): any => {
        const xxx = (index % this.maxId) + 1;
        if (xxx < 1) {
            throw new Error("FkColumn.makeId不能小于0");
        }
        return "ID-" + xxx;
    };
}
