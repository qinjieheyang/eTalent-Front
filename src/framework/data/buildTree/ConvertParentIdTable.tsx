import { UtilLog } from "../../utils/UtilLog";
import { ATreeConvert, ITreeNode } from "./ATreeConvert";
import { TreeMap } from "./TreeMap";

export interface IRowParentId {
    id: string;
    name: string;
    parentId?: string;
}

/** ParentID树 */
export class ConvertParentIdTable extends ATreeConvert {
    private joinFieldName?: string;
    private rows: IRowParentId[];
    constructor(type: string, rows: IRowParentId[], joinFieldName?: string, isDisable: boolean = false) {
        super(type, isDisable);
        this.rows = rows;
        this.joinFieldName = joinFieldName;
    }
    protected join(treeMap: TreeMap): void {
        const topNodes = this.getTopNodes();
        if (this.joinFieldName == null) {
            this.joinTop(treeMap, topNodes);
        } else {
            this.joinParent(treeMap, topNodes);
        }
    }
    private joinTop(treeMap: TreeMap, topNodes: ITreeNode[]) {
        for (const topNode of topNodes) {
            treeMap.addTop(topNode);
        }
    }

    private joinParent(treeMap: TreeMap, topNodes: ITreeNode[]) {
        if (this.Pre == null) {
            throw new Error("上级转换器不能为空");
        }
        const joinType = this.Pre.Type;
        for (const topNode of topNodes) {
            if (this.joinFieldName == null) {
                continue;
            }
            const joinId = (topNode as any)[this.joinFieldName];
            treeMap.join(topNode, joinType, joinId);
        }
    }

    // 获取顶层节点，包含子节点
    private getTopNodes(): ITreeNode[] {
        const allMap = new Map<string, ITreeNode>();
        const tops = new Array<ITreeNode>();
        const nextRows = new Array<IRowParentId>();

        // 获取Top节点，和全部映射
        for (const row of this.rows) {
            const node = row as ITreeNode;
            node.type = this.Type;
            node.disabled = this.IsDisable;
            node.children = new Array<ITreeNode>();
            allMap.set(node.id, node);
            if (row.parentId == null) {
                tops.push(node);
            } else {
                nextRows.push(node);
            }
        }

        // 剩余连接
        this.nextJoin(allMap, nextRows);

        return tops;
    }
    private nextJoin(allMap: Map<string, ITreeNode>, nextRows: IRowParentId[]): any {
        for (const nextRow of nextRows) {
            if (nextRow.parentId == null) {
                continue;
            }
            const parentNode = allMap.get(nextRow.parentId);
            if (parentNode == null) {
                UtilLog.error("连接错误,通过parentId找不到父记录", nextRow);
                continue;
            }
            parentNode.children.push(nextRow as ITreeNode);
        }
    }
}
