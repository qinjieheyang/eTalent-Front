import {  TreeSelect } from "antd";
import * as React from "react";
 
 
interface  IRow{
    id:string ;
    name:string ;
    children:IRow[];
}


interface IProps   {
    canMulSelect?: boolean;
    treeDefaultExpandAll?: boolean;
    onlySelectLeftNode?: boolean;
    /** 值 */
    value: any;
    /** 是否禁用，无法录入 */
    isDisabled?: boolean;
    /** 输入框提示 */
    placeholder?: string;
    onChange?: (value: any, label: any, extra: any) => void;
    items?: IRow[];
    style?: React.CSSProperties;
}

export class ComboBoxTree extends React.Component<IProps>  {
    public render = (): React.ReactElement<any> => {
        const canMulSelect = this.props.canMulSelect == null ? false : this.props.canMulSelect;

        const treeDefaultExpandAll = false !== this.props.treeDefaultExpandAll;
        let opts;
        if (this.props.items == null || this.props.items.length === 0) {
            opts = [
                {
                    disabled: true,
                    key: "-x",
                    value: "-x",
                    title: "绑定SelectItems数据源不能为空"
                }
            ];
        } else {
            opts = toKeyTitle(this.props.items, this.props.onlySelectLeftNode === true);
        }
        return (
            <TreeSelect
 
            style={  this.props.style}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            multiple={canMulSelect}
            treeData={opts}
            treeDefaultExpandAll={treeDefaultExpandAll}
            disabled={false}
            allowClear={true}
            showSearch={true}
            filterTreeNode={filterOptionFunc}
            onChange={ this.handleChange}
        />
        );
    };

 

    private handleChange = (e: any, label: any, extra: any) => {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(  e ,label, extra);
    };
}

const filterOptionFunc = (inputValue: any, treeNode: any) => {
    const title = treeNode.props.title;
    const text = title;
    const inputText = inputValue.toLowerCase();
    const index = text.indexOf(inputText);
    return index > -1;
};

function toKeyTitle(rows: any[], onlySelectLeftNode: boolean): any {
    if (rows == null) {
        return undefined;
    }
    if (rows.length === 0) {
        return undefined;
    }
    const newRows = [];
    for (const row of rows) {
        const newChildren = toKeyTitle(row.children, onlySelectLeftNode);
        const isNotLeafNode = newChildren !== undefined;
        const canNotSelectLeftNode = isNotLeafNode && onlySelectLeftNode;
        const newRow = {
            disabled: canNotSelectLeftNode,
            key: row.id,
            value: row.id,
            title: row.name,
            children: newChildren
        };
        newRows.push(newRow);
    }
    return newRows;
}
