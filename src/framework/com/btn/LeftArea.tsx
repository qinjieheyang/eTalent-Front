// import { Col } from "antd";
import * as React from "react";
import "./me.css";
export interface ILeftAreaProps {
    colSpan?: number;
}

/** left区域 */
export class LeftArea extends React.Component<ILeftAreaProps> {
    public render() {
        // const span = this.props.colSpan ? this.props.colSpan : 12;
        return <div style={{ display: "inline-block", marginBottom: 16 }}>{this.renderChildren()}</div>;
    }

    private renderChildren = () => {
        const ls: any[] = [];
        if (this.props.children == null) {
            return ls;
        }
        if (this.props.children instanceof Array === false) {
            return <span style={{ marginRight: 16, display: "inline-block" }}> {this.props.children} </span>;
        }
        const children = this.props.children as any[];
        let key = 0;
        for (const child of children) {
            key = key + 1;
            ls.push(
                <span key={key} style={{ marginRight: 16, display: "inline-block" }}>
                    {child}
                </span>
            );
        }

        return ls;
    };
}
