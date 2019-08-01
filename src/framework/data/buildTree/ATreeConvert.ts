import { TreeMap } from "./TreeMap";

export interface IRow {
    id: string;
    name: string;
}

export interface ITreeNode {
    disabled: boolean;
    type: string;
    id: string;
    name: string;
    children: ITreeNode[];
}

// tslint:disable-next-line:max-classes-per-file
export abstract class ATreeConvert {
    /** 原始记录 */

    private type: string;
    private pre: ATreeConvert;
    private isDisable: boolean;
    // public set Next(nextConvert: ATreeConvert) {
    //     nextConvert.pre = this;
    // }
    public set Pre(preConvert: ATreeConvert) {
        this.pre = preConvert;
    }

    public get Pre() {
        return this.pre;
    }
    public get Type() {
        return this.type;
    }

    public get IsDisable() {
        return this.isDisable;
    }

    constructor(type: string, isDisable: boolean) {
        this.type = type;
        this.isDisable = isDisable;
    }
    public getTree(): ITreeNode[] {
        return this.getTreeMap().getTree();
    }
    public getTreeMap(): TreeMap {
        if (this.pre == null) {
            // 当前是顶层
            const topTreeMap = new TreeMap();

            this.join(topTreeMap);
            return topTreeMap;
        }
        // 获取上层nodeMap
        const parentTreeMap = this.pre.getTreeMap();
        // 将当前节点连接到父节点
        this.join(parentTreeMap);

        return parentTreeMap;
    }

    protected abstract join(parentTreeMap: TreeMap): void;
}
