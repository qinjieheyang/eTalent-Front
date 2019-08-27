import { Form } from "antd";
import * as React from "react";
import { CheckBoxList } from '../../checkbox/CheckBoxList';
import { AInput, IAInputProp } from "./AInput";

interface ICheckbox {
  value: string|number;
  name: string;
}

interface ICheckBoxListProp extends IAInputProp {
  items: ICheckbox[]
}

export class CheckBoxListInput extends AInput<ICheckBoxListProp> {
    public render = (): React.ReactElement<any> => {
        return (
            <Form.Item style={this.Style} {...this.props.formItem}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(this.props.value),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(
                  <CheckBoxList 
                    // value= { this.props.value}
                    items={this.props.items}
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


