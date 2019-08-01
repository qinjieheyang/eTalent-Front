import { Form, InputNumber } from "antd";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

export interface INumberProp extends IAInputProp {
    min?: number;
    max?: number;
    stepNum?: number;
    title?: string;
}

export class NumberInput extends AInput<INumberProp> {
    public render = (): React.ReactElement<any> => {
        return (
            <Form.Item style={this.Style}>
                {this.props.getFD(this.props.fieldName, {
                    initialValue: this.GetIniValue(this.props.value),
                    onChange: (e: any) => {
                        this.handleChange(e);
                    },
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder={null == this.props.title ? this.props.title : ""}
                        disabled={this.props.isDisabled}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.stepNum}
                        {...this.getInputPropsObj()}
                    />
                )}
            </Form.Item>
        );
    };

    private handleChange = (val: any) => {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(this.props.fieldName, val);
    };

    private GetIniValue = (val?: object): any => {
        if (!val) {
            return undefined;
        }
        if (typeof val === "string") {
            const num = Number(val);
            return num;
        }

        if (typeof val === "number") {
            return val;
        }
        throw new Error("NumberCreator不支持非法的初始值类型，iniValue：" + typeof val);
    };
}

/*

     Create = (getFieldDecorator) => {
        let stepNum = null;

        if (this.Precision <= 0 || this.Precision === undefined || this.Precision == null) {
            stepNum = 1;
        } else {
            stepNum = 1 / (Math.pow(10, this.Precision));
        }

        return (
            <Form.Item  {...this.GetFormItemProps(this)} >
                {
                    getFieldDecorator(this.FieldName, {
                        initialValue: this.GetIniValue(this.FieldName),
                        rules: [
                            {required: this.IsRequired, message: '必填'},
                        ],
                        onChange: (value) => this._handleChange(value)
                    })(<InputNumber
                        style={{width: "100%"}}
                        placeholder={null == this.Placeholder ? this.LabelName : this.Placeholder}
                        disabled={this.IsDisabled} min={this.Min}
                        max={this.Max} step={stepNum}/>)
                }
            </Form.Item>
        );
    }



 */
