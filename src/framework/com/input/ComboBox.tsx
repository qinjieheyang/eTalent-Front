import { Select } from "antd";
import * as React from "react";

interface  IRow{
    id:string ;
    name:string ;
}

interface IProps {

    /** 值 */
    value: any;
    /** 是否禁用，无法录入 */
    isDisabled?: boolean;
    /** 输入框提示 */
    placeholder?: string;

    onChange?: (value: any, option: React.ReactElement<any> | React.ReactElement<any>[]) => void;

    items?: IRow[];
    canMulSelect?: boolean;
}

export class ComboBox extends React.Component<IProps> {
    public render = (): React.ReactElement<any> => {
        const canMulSelect = this.props.canMulSelect ? false : this.props.canMulSelect;
        const items = this.props.items ? this.props.items : [];
        return (
            <Select
                style={{ width: "100%" }}
                mode={canMulSelect ? "multiple" : undefined}
                showSearch={true}
                allowClear={true}
                filterOption={filterOptionFunc}
                onChange={this.props.onChange}
                value={this.props.value}
                placeholder={this.props.placeholder}
            >
                {items.map((item: any, i) => {
                    return (
                        <Select.Option value={item.id} key={item.id}>
                            {item.name}
                        </Select.Option>
                    );
                })}
            </Select>
        );
    };
 
}

const filterOptionFunc = (input: any, option: any) => {
    for (const cellValue of option.props.children) {
        const isOk = cellValue.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        if (isOk === true) {
            return true;
        }
    }
    return false;
};
