import { ITreeNode } from "./ATreeConvert";

/** 管理全部节点 和 顶层节点的容器 */
export class TreeMap {
    private allTreeNodeMap = new Map<string, ITreeNode>();
    private topTreeNodes: ITreeNode[] = [];
    public join(node: ITreeNode, joinType: string, joinId: any): void {
        const fullJoinId = joinType + "_" + joinId;
        const parentNode = this.allTreeNodeMap.get(fullJoinId);
        if (parentNode == null) {
            // 压入顶层，容错处理
            this.addTop(node);
        } else {
            // Join连接
            parentNode.children.push(node);
        }
        // 处理子成员
        this.childrenSetToMap(node.children);
    }
    public addTop(topNode: ITreeNode): any {
        this.topTreeNodes.push(topNode);
        this.allTreeNodeMap.set(topNode.type + "_" + topNode.id, topNode);
        this.childrenSetToMap(topNode.children);
    }
    public getTree(): ITreeNode[] {
        return this.topTreeNodes;
    }
    private childrenSetToMap(childNodes: ITreeNode[]): any {
        if (childNodes == null) {
            return;
        }
        for (const child of childNodes) {
            this.allTreeNodeMap.set(child.type + "_" + child.id, child);
            this.childrenSetToMap(child.children);
        }
    }
}
