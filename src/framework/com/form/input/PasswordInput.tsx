import { Form, Input } from "antd";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

export interface IPasswordProp extends IAInputProp {
    min?: number;
    max?: number;
}
export class PasswordInput extends AInput<IPasswordProp> {
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
                        { min: this.props.min, message: `长度最小${this.props.min}` },
                        { max: this.props.max, message: `长度最大${this.props.max}` },
                        { ...this.getRuleValidatorObj() }
                    ]
                })(<Input type="password" {...this.getInputPropsObj()} />)}
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
