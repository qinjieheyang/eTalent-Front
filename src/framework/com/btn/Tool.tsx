// import { Row } from "antd";
import * as React from "react";
import { Btn } from "./Btn";
import { BtnGroup, BtnGroupBtn } from "./BtnGroup";
import { LeftArea } from "./LeftArea";
import "./me.css";
import { RightArea } from "./RightArea";

/** 页面工具栏 */
export class Tool extends React.Component {
    /** 无需布局 */
    public static LeftArea: typeof LeftArea = LeftArea;
    /** 需要自定义布局 */
    public static RightArea: typeof RightArea = RightArea;
    public static Btn: typeof Btn = Btn;
    public static BtnGroup: typeof BtnGroup = BtnGroup;
    public static BtnGroupBtn: typeof BtnGroupBtn = BtnGroupBtn;
    public render() {
        return <div className="cf-table-tool">{this.props.children}</div>;
    }
}

// display: -webkit-flex; display: flex; height: 400px; background-color: bisque; justify-content:   space-between  ;flex-flow:  flex-wrap;
