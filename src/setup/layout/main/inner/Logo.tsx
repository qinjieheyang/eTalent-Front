import * as React from "react";

import { Icon } from "antd";

interface ILogoProps {
  collapsed: boolean;
  onClickToggle: () => void;
}

/** 系统标志 */
export class Logo extends React.Component<ILogoProps> {
  public render() {
    return (
      <div
        id="logo"
        style={{
          height: "60px",
          background: " rgba(255, 255, 255, 0.2)",
          margin: "1px "
        }}
      >
        <Icon
          style={{
            fontSize: "18px",
            lineHeight: "64px",
            padding: "0 24px",
            cursor: "pointer",
            transition: "color .3s",
            color: "#fff"
          }}
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.onClickToggle}
        />
      </div>
    );
  }
}
