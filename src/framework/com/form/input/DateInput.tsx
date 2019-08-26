import { DatePicker, Form } from "antd";
import * as moment from "moment";
import * as React from "react";
import { AInput, IAInputProp } from "./AInput";

// tslint:disable-next-line:no-empty-interface
export interface IDateProp extends IAInputProp {
    format?: string;
}

export class DateInput extends AInput<IDateProp> {
    public render = () => {
        const formatText = this.props.format ? this.props.format : "YYYY-MM-DD";
        return (
            <Form.Item id={"form-item-" + this.props.fieldName} style={this.Style} {...this.props.formItem}>
                {this.props.getFD(this.props.fieldName, {
                    ...this.getIniValue(),
                    onChange: this.handleChange,
                    rules: [{ required: this.isRequired, message: "必填" }]
                })(<DatePicker2 style={{ width: "100%" }} format={formatText} {...this.getInputPropsObj()} />)}
            </Form.Item>
        );
    };

    // value出去--->转换为Date类型
    private handleChange = (dateValue: any) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.fieldName, dateValue);
        }
    };

    // value进入--->转换为moment类型
    private getIniValue = (): any => {
        const val = this.props.value;
        if (val === undefined) {
            return {};
        }

        return { initialValue: this.props.value };
    };
}

// 负责转换Moment ----Date
// tslint:disable-next-line:max-classes-per-file
class DatePicker2 extends React.Component<any> {
    public render() {
        let v = this.props.value;
        if (v) {
            if (moment.isMoment(v) === false) {
                v = moment.utc(this.props.value).utcOffset(8);
            }
        }
        return (
            <DatePicker
                value={v}
                style={{ width: "100%" }}
                format={this.props.format}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
            />
        );
    }

    private handleChange = (monentValue: any) => {
        if (this.props.onChange) {
            if (monentValue) {
                if (moment.isMoment(monentValue) === false) {
                    throw new Error("缺moment.js,代码错误:859387Ac");
                }
                const dateValue: Date = monentValue.toDate();
                this.props.onChange(dateValue);
            } else {
                this.props.onChange(null);
            }
        }
    };
}
