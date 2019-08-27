import { Form, TreeSelect } from "antd";
import * as React from "react";
 
import { AInput, IAInputProp } from "./AInput";

interface  IRow{
    id: string| number ;
    name:string ;
    children?:IRow[];
}


interface ISelectTreeProp extends IAInputProp {
    selectItems: IRow[];
    treeDefaultExpandAll?: boolean;
}

export class SelectTreeInput extends AInput<ISelectTreeProp> {
    public render = (): React.ReactElement<any> => {

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
            opts = toKeyTitle(this.props.selectItems);
        }
        return (
            <Form.Item style={this.Style} {...this.props.formItem}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(this.props.value),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(
                    <TreeSelect
                        {...this.getInputPropsObj()}
                        style={{ width: "100%" }}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
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

function toKeyTitle(rows: any[]): any {
    if (rows == null) {
        return undefined;
    }
    if (rows.length === 0) {
        return undefined;
    }
    const newRows = [];
    for (const row of rows) {
        const newChildren = toKeyTitle(row.children);
        const newRow = {
            key: row.id,
            value: row.id,
            title: row.name,
            children: newChildren
        };
        newRows.push(newRow);
    }
    return newRows;
}
