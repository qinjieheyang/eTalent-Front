import { Dropdown, Icon, Menu } from "antd";
import * as React from "react";
import { IconBlock } from "./IconBlock";
// tslint:disable-next-line:no-empty-interface
export interface IHelpProps {}

export default class Help extends React.Component<IHelpProps> {
  constructor(props: IHelpProps) {
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
            <Icon type="question-circle" style={{ fontSize: "1.5em" }} />
          </span>
        </Dropdown>
      </IconBlock>
    );
  }

  private getMenus = () => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleClick}> item </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleClick}> item </a>
        </Menu.Item>
      </Menu>
    );
  };

  private handleClick = () => {};
}
