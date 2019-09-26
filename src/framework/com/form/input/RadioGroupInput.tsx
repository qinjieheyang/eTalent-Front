import { Form, Radio } from "antd";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

export interface IRadioGroupInput extends IAInputProp {
    options: Array<{ label: string; value: string; }>
}

export class RadioGroupInput extends AInput<IRadioGroupInput> {
    public render = (): React.ReactElement<any> => {

        return (
            <Form.Item style={this.Style} {...this.props.formItem}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(this.props.value),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(
                    <Radio.Group style={{ width: "100%" }} {...this.getInputPropsObj()}>
                        {
                            this.props.options.map(item =>  <Radio key={item.label} value={item.value}>{item.label}</Radio>)
                        }
                    </Radio.Group>
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
