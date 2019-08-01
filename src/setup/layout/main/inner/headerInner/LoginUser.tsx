import { Dropdown, Menu, Icon } from "antd";
import * as React from "react";
// import { Link } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import { IconBlock } from "./IconBlock";
export interface ILoginUserProps {
  onLoginOff: () => void;
}
export interface ILoginUserState {
  visible: boolean;
}

export default class LoginUser extends React.Component<
  ILoginUserProps,
  ILoginUserState
> {
  constructor(props: ILoginUserProps) {
    super(props);
    this.state = {
      visible: false
    };
  }

  public ini(): void {
    //
  }

  public render() {
    const menus = this.getUserMenu();
    return (
      <IconBlock>
        <Dropdown overlay={menus}>
          <span>
            <Icon type="user" style={{ fontSize: "1.5em" }} />
          </span>
        </Dropdown>
        <ChangePasswordModal
          onLoginOff={this.props.onLoginOff}
          visible={this.state.visible}
          onCancel={this.onCancel}
        />
      </IconBlock>
    );
  }

  private getUserMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={this.loginOff}>注销</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.showModal}> 修改密码</a>
        </Menu.Item>
      </Menu>
    );
  };
  private loginOff = () => {
    this.props.onLoginOff();
  };
  private showModal = () => {
    this.setState({ visible: true });
  };
  private onCancel = () => {
    this.setState({ visible: false });
  };
}
