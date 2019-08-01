import { AColumn } from "../AColumn";

export class FkArrayColumn extends AColumn {
    public maxId = 10;

    public make = (index: number): any => {
        const xxx = (index % this.maxId) + 1;
        const xxx2 = xxx + 1;
        if (xxx < 1) {
            throw new Error("FkArrayColumn.makeId不能小于0");
        }
        if (xxx2 < 1) {
            throw new Error("FkArrayColumn.makeId不能小于0 --------");
        }
        return ["ID-" + xxx, "ID-" + xxx2];
    };
}
