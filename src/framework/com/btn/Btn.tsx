import { Button, Tooltip } from "antd";

import * as React from "react";

 

export interface IBtnProps {
    type?: "primary" | "danger" | "default";
    text?: string;
    icon?:  string;
    remark?: string;
    disabled?: boolean;
    onClick?: () => void;
}

/** 按钮 */
export class Btn extends React.Component<IBtnProps> {
    public constructor(props: IBtnProps) {
        super(props);
    }
    public render = () => {
        return (
            <Tooltip style={{ display: "inline-block" }} title={this.props.remark}>
                <Button
                    type={this.props.type ? this.props.type : "primary"}
                    icon={this.props.icon}
                    title={this.props.remark}
                    onClick={this.props.onClick}
                    disabled={this.props.disabled}
                    // ghost={true}
                >
                    {this.props.text}
                </Button>
            </Tooltip>
        );
    };
}
