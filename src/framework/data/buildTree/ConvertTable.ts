import { ATreeConvert, ITreeNode } from "./ATreeConvert";
import { TreeMap } from "./TreeMap";

export interface IRowTable {
    id: string;
    name: string;
}

/** Join表 */
export class ConvertTable extends ATreeConvert {
    private rows: IRowTable[];
    private joinFieldName: string | undefined;
    constructor(type: string, rows: IRowTable[], joinFieldName?: string, isDisable: boolean = false) {
        super(type, isDisable);
        this.rows = rows;
        this.joinFieldName = joinFieldName;
    }
    protected join(treeMap: TreeMap): void {
        // const nodes = this.getNodes();
        for (const row of this.rows) {
            this.joinRow(treeMap, row);
        }
    }
    private joinRow(treeMap: TreeMap, row: IRowTable) {
        if (row.id == null) {
            throw new Error("row.id不能为空");
        }
        if (row.name == null) {
            throw new Error("row.name不能为空");
        }
        const anyRow = row as ITreeNode;
        anyRow.type = this.Type;
        anyRow.disabled = this.IsDisable;
        if (anyRow.children == null) {
            anyRow.children = new Array<ITreeNode>();
        }

        if (this.joinFieldName == null) {
            // anyRow.type = this.Type;
            treeMap.addTop(anyRow);
            return;
        }
        this.joinParent(treeMap, anyRow);
    }

    private joinParent(treeMap: TreeMap, node: ITreeNode) {
        if (this.Pre == null) {
            throw new Error("上级转换器不能为空");
        }
        const joinType = this.Pre.Type;
        if (this.joinFieldName == null) {
            return;
        }
        const joinId = node[this.joinFieldName];
        treeMap.join(node, joinType, joinId);
    }
}
