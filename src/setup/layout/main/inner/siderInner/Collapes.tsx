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
      <div className="qj-collapes" onClick={this.props.onClickToggle}>
        <span className="qj-collapes-txt">导航栏</span>
        <Icon
          className="qj-collapes-icon"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
        />
      </div>
    );
  }
}
