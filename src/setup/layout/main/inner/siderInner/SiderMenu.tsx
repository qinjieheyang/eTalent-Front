import {  Menu } from "antd";
import * as React from "react";
import * as Framework from "src/framework/Framework";
import { getTopMenuItems } from "./getMenuItems";

interface ISiderMenuProps {
  sideRegs: Framework.Case.RegCollection;
  urlPath: string;
  collapsed: boolean;
}

/** 功能菜单 */
export class SiderMenu extends React.Component<ISiderMenuProps> {
  public render() {
    if (this.props.sideRegs == null) {
      return <div />;
    }
    const defaultOpenKeys = this.getOpenTopMenuKey(this.props.urlPath);
    const defaultSelectedKeys = this.getActionChildMenuKey(this.props.urlPath);
    // console.log(defaultOpenKeys,defaultSelectedKeys,this.props.urlPath)
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={defaultSelectedKeys}
      >
        {getTopMenuItems(this.props.sideRegs.getTopRegs())}
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
    const topReg = this.props.sideRegs.getParentRegByRoutePath(pathname);
    if (!topReg) {
      return [];
    }

    return [topReg.routePath];
  }

  // 通过当前路由URL获取当前激活 2级菜单
  private getActionChildMenuKey(pathname: string): string[] {
    const childReg = this.props.sideRegs.getRegByRoutePath(pathname);
    if (childReg) {
      Framework.Utils.UtilLog.warn("getChildMenuKey", childReg);
      return [childReg.routePath];
    }
    return ['/'];
  }
}
