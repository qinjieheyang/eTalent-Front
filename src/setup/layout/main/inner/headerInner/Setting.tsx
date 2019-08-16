import { Dropdown, Icon, Menu } from "antd";
import * as React from "react";
import { IconBlock } from "./IconBlock";
// tslint:disable-next-line:no-empty-interface
export interface ISetProps {}

export default class Setting extends React.Component<ISetProps> {
  constructor(props: ISetProps) {
    super(props);
  }

  public ini(): void {
    //
  }

  public render() {
    const menus = this.getMenus();
    return (
      <IconBlock>
        <Dropdown overlay={menus}>
          <span>
            <Icon type="setting" style={{ fontSize: "1.5em" }} />
          </span>
        </Dropdown>
      </IconBlock>
    );
  }

  private getMenus = () => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleClick}> 主题一 </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleClick}> 主题二 </a>
        </Menu.Item>
      </Menu>
    );
  };

  private handleClick = () => {};
}
