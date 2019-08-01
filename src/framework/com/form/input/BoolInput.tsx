import { Form, Radio } from "antd";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

export interface IBoolProp extends IAInputProp {
    trueName?: string;
    falseName?: string;
}

export class BoolInput extends AInput<IBoolProp> {
    public render = (): React.ReactElement<any> => {
        const trueName = this.props.trueName ? this.props.trueName : "是";
        const falseName = this.props.trueName ? this.props.falseName : "否";

        return (
            <Form.Item style={this.Style}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(this.props.value),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(
                    <Radio.Group style={{ width: "100%" }} {...this.getInputPropsObj()}>
                        <Radio value={true}>{trueName}</Radio>
                        <Radio value={false}>{falseName}</Radio>
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
