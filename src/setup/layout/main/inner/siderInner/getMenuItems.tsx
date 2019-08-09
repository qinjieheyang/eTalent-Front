import { Icon, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as Framework from "src/framework/Framework";
import "./MenuItem.css";

/** 功能菜单 */
export function getTopMenuItems(topRegs: Framework.Case.Reg[]) {
  const topMenus: React.ReactNode[] = Array<JSX.Element>();
  topRegs.forEach(topReg => {
    if (topReg.isHomePage() === true) {
      return;
    }
    const topMenu = getTopMenuItem(topReg);
    topMenus.push(topMenu);
  });
  return topMenus;
}

export function getTopMenuItem(topReg: Framework.Case.Reg) {
  console.log(topReg,22)
  if (topReg.getChildren().length === 0) {
    return (
      <Menu.Item key={topReg.routePath}>
        <Link to={topReg.routePath}>
          <Icon type={topReg.icon} />
          <span className="layout-main-menu-item">{topReg.title}</span>
        </Link>
      </Menu.Item>
    );
  }

  // tslint:disable-next-line:no-debugger

  return (
    <Menu.SubMenu
      key={topReg.routePath}
      title={
        <span>
          <Icon type={topReg.icon} />
          <span>{topReg.title}</span>
        </span>
      }
    >
      {getSubMenus(topReg)}
    </Menu.SubMenu>
  );
}

function getSubMenus(topReg: Framework.Case.Reg): JSX.Element[] {
  const topMenus: JSX.Element[] = Array<JSX.Element>();
  topReg.getChildren().forEach(childReg => {
    const menu = (
      <Menu.Item key={childReg.routePath}>
        <Link to={childReg.routePath}>{childReg.title}</Link>
      </Menu.Item>
    );
    topMenus.push(menu);
  });
  return topMenus;
}
