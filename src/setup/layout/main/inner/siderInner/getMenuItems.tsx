import React from "react";
import {  Menu } from "antd";
import { Link } from "react-router-dom";
import * as Framework from "src/framework/Framework";
import "./MenuItem.css";

const IconFont = Framework.Com.Icons.Icon;

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
  if (topReg.getChildren().length === 0) {
    return (
      <Menu.Item key={topReg.routePath}>
        <Link to={topReg.routePath}>
          <IconFont type={topReg.icon} style={{paddingRight:14}} size={16}/>
          <span className="layout-main-menu-item">{topReg.title}</span>
        </Link>
      </Menu.Item>
    );
  }

  // tslint:disable-next-line:no-debugger

  return (
    <Menu.SubMenu
      className="qj-side-menu-submenu"
      key={topReg.routePath}
      title={
        <div>
          <span>
            <IconFont type={topReg.icon} style={{paddingRight:14}}  size={16}/>
            <span>{topReg.title}</span>
          </span>
        </div>
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
      <Menu.Item key={childReg.routePath} >
        <Link style={{paddingLeft:30}} to={childReg.routePath}>{childReg.title}</Link>
      </Menu.Item>
    );
    topMenus.push(menu);
  });
  return topMenus;
}
