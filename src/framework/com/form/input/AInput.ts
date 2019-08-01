import * as React from "react";

export interface IAInputProp {
    style?: React.CSSProperties;
    getFD: any;

    /** 字段 */
    fieldName: string;
    /** 初始值 */
    value?: any;
    /** 必填 */
    isRequired?: boolean;
    /** 是否禁用，无法录入 */
    isDisabled?: boolean;
    /** 输入框提示 */
    placeholder?: string;

    onChange?: (fieldName: string, val: any) => void;

    validator?: (rule: any, value: any, callback: any) => void;
}
export abstract class AInput<T extends IAInputProp> extends React.Component<T> {
    public get Style(): React.CSSProperties | undefined {
        if (this.props.style == null) {
            return {};
        }

        return this.props.style;
    }

    protected getInputPropsObj(): any {
        return { disabled: this.props.isDisabled, placeholder: this.props.placeholder };
    }

    protected getRuleValidatorObj(): any {
        if (this.props.validator) {
            return { validator: this.props.validator };
        }
        return {};
    }

    protected get isRequired(): boolean {
        if (this.props.isRequired === true) {
            return true;
        }
        return false;
    }
}
