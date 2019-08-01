import { Icon, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as Framework from "src/framework/Framework";
import { getTopMenuItems } from "./getMenuItems";

interface ISiderMenuProps {
  mainRegs: Framework.Case.RegCollection;
  urlPath: string;
  collapsed: boolean;
}

/** 功能菜单 */
export class SiderMenu extends React.Component<ISiderMenuProps> {
  public render() {
    if (this.props.mainRegs == null) {
      return <div />;
    }
    const defaultOpenKeys = this.getOpenTopMenuKey(this.props.urlPath);
    const defaultSelectedKeys = this.getActionChildMenuKey(this.props.urlPath);

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
      >
        <Menu.Item key={"Home"}>
          <Icon type="home" />

          <span className="layout-main-menu-item">
            <Link to={"/"}>首页</Link>
          </span>
        </Menu.Item>
        {getTopMenuItems(this.props.mainRegs.getTopRegs())}
      </Menu>
    );
  }

  // 通过当前路由URL获取当前激活 top菜单
  private getOpenTopMenuKey(pathname: string): string[] {
    // 菜单折叠后，不能设置菜单.defaultOpenKeys
    if (this.props.collapsed === true) {
      return [];
    }
    // 2层菜单被选中
    const topReg = this.props.mainRegs.getParentRegByRoutePath(pathname);
    if (!topReg) {
      return [];
    }

    return [topReg.routePath];
  }

  // 通过当前路由URL获取当前激活 2级菜单
  private getActionChildMenuKey(pathname: string): string[] {
    const childReg = this.props.mainRegs.getRegByRoutePath(pathname);
    if (childReg) {
      Framework.Utils.UtilLog.warn("getChildMenuKey", childReg);
      return [childReg.routePath];
    }
    return [];
  }
}
