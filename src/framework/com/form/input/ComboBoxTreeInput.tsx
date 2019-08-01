import { Form, TreeSelect } from "antd";
import * as React from "react";
 
import { AInput, IAInputProp } from "./AInput";

interface  IRow{
    id:string ;
    name:string ;
    children?:IRow[];
}


interface IComboBoxProp extends IAInputProp {
    selectItems: IRow[];
    canMulSelect?: boolean;
    treeDefaultExpandAll?: boolean;
    onlySelectLeftNode?: boolean;
}

export class ComboBoxTreeInput extends AInput<IComboBoxProp> {
    public render = (): React.ReactElement<any> => {
        const canMulSelect = this.props.canMulSelect == null ? false : this.props.canMulSelect;

        const treeDefaultExpandAll = false !== this.props.treeDefaultExpandAll;
        let opts;
        if (this.props.selectItems == null || this.props.selectItems.length === 0) {
            opts = [
                {
                    disabled: true,
                    key: "-x",
                    value: "-x",
                    title: "绑定SelectItems数据源不能为空"
                }
            ];
        } else {
            opts = toKeyTitle(this.props.selectItems, this.props.onlySelectLeftNode === true);
        }
        return (
            <Form.Item style={this.Style}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(this.props.value),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(
                    <TreeSelect
                        {...this.getInputPropsObj()}
                        style={{ width: "100%" }}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        multiple={canMulSelect}
                        treeData={opts}
                        treeDefaultExpandAll={treeDefaultExpandAll}
                        disabled={false}
                        allowClear={true}
                        showSearch={true}
                        filterTreeNode={filterOptionFunc}
                    />
                )}
            </Form.Item>
        );
    };

    private getIniValue = (val?: object): any => {
        if (val === undefined) {
            return {};
        }
        return { initialValue: val };
    };

    private handleChange = (e: any, label: any, extra: any) => {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(this.props.fieldName, e);
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
