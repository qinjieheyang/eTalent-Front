import { Form, Input } from "antd";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

export interface ITextAreaProp extends IAInputProp {
    max?: number;
}
export class TextAreaInput extends AInput<ITextAreaProp> {
    public render = (): React.ReactElement<any> => {
        return (
            <Form.Item style={this.Style}>
                {this.props.getFD(this.props.fieldName, {
                    initialValue: this.GetIniValue(this.props.value),
                    onChange: (e: any) => {
                        this.handleChange(e);
                    },
                    rules: [
                        { type: "string", message: "无效" },
                        { required: this.isRequired, message: "必填" },
                        { max: this.props.max, message: `长度最大${this.props.max}` }
                    ]
                })(<Input.TextArea {...this.getInputPropsObj()} autosize={true} />)}
            </Form.Item>
        );
    };

    private GetIniValue = (val?: object): any => {
        if (!val) {
            return "";
        }
        return val;
    };

    private handleChange = (e: any) => {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(this.props.fieldName, e.target.value);
    };
}
