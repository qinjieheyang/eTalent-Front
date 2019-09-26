import { Form, Select } from "antd";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

const { Option } = Select;

interface IOption{
  label: string;
  value: string|number;
}


export interface ISelectProp extends IAInputProp {
  options?: IOption[];
}
export class SelectInput extends AInput<ISelectProp> {
    public render = (): React.ReactElement<any> => {
        return (
            <Form.Item style={this.Style} {...this.props.formItem}>
              {
                this.props.getFD(this.props.fieldName, {
                  initialValue: this.GetIniValue(this.props.value),
                  onChange: (e: any) => {
                      this.handleChange(e);
                  },
                  rules: [
                      { required: this.isRequired, message: "必填" }
                  ]
                })(
                <Select  {...this.getInputPropsObj()}>
                  { this.getOptions() }
                </Select>
                )
              }
            </Form.Item>
        );
    };

    private GetIniValue = (val?: object): any => {
        if (!val) {
            return "";
        }
        return val;
    };

    private getOptions = () => {
      const option: IOption[] = this.props.options || [];
      return option.map((opt: IOption, index: number) => {
        return <Option key={opt.value} value={opt.value}>{opt.label}</Option>
      })
    }

    private handleChange = (e: any) => {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(this.props.fieldName, e.target.value);
    };
}
