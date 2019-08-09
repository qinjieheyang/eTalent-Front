import * as React from "react";

import { Icon } from "antd";

interface ICollapesProps {
  collapsed: boolean;
  onClickToggle: () => void;
}

/** 系统标志 */
export class Collapes extends React.Component<ICollapesProps> {
  public render() {
    return (
      <div
        id="logo"
        style={{
          height: "40px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "1px ",
          textAlign: "center"
        }}
      >
        <Icon
          style={{
            fontSize: "18px",
            lineHeight: "46px",
            padding: "0 13px",
            cursor: "pointer",
            transition: "color .3s",
            color: "#fff"
          }}
          type={this.props.collapsed ? "more" : "menu"}
          onClick={this.props.onClickToggle}
        />
      </div>
    );
  }
}
