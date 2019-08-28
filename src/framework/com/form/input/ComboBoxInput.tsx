import { Form } from "antd";
import * as React from "react";
import { ComboBox } from '../../input/ComboBox';
import { AInput, IAInputProp } from "./AInput";

interface  IRow{
    id:string ;
    name:string ;
}

interface IComboBoxProp extends IAInputProp {
    items: IRow[];
    canMulSelect?: boolean;
}

export class ComboBoxInput extends AInput<IComboBoxProp> {
    public render = (): React.ReactElement<any> => {
        return (
            <Form.Item style={this.Style} {...this.props.formItem}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(this.props.value),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(

                    <ComboBox 
 
                    value= { this.props.value}
                    isDisabled={ this.props.isDisabled}
                    placeholder= { this.props.placeholder}
                    items={this.props.items}
                    canMulSelect={ this.props.canMulSelect}

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

    private handleChange = (e: any) => {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(this.props.fieldName, e);
    };
}


