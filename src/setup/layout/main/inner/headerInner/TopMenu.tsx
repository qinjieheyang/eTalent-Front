import { Menu } from 'antd';
import * as React from "react";
import { Link } from 'react-router-dom';
import * as Framework from "src/framework/Framework";
// import "./TopMenu.less";

import { mainRegs } from "src/case/mainRegs";

const topRegs = mainRegs.getTopRegs();

export interface ITopMenuProps {
  topUrl: string;
  onMenuChange:(routePath:string) => void;
}

export default class TopMenu extends React.Component<ITopMenuProps> {
  constructor(props: ITopMenuProps) {
    super(props);
  }
  
  public render() {
    const selectedKeys = this.getActionMenuKey(this.props.topUrl);
    
    return (
      <Menu onClick={this.handleClick} selectedKeys={selectedKeys} mode="horizontal" className="qj-header-menu">
        {this.getMenuItems(topRegs)}
      </Menu>
    );
  }

  private handleClick = (item:any) => {
    if(this.props.topUrl !== item.key){
      this.props.onMenuChange(item.key);
    }
  };

  private getTopMenuItem = (topReg: any) =>{
    return (
      <Menu.Item key={topReg.routePath}>
        <Link to={topReg.routePath}>{topReg.title}</Link>
      </Menu.Item>
    )
  }

  private getMenuItems = (topRegs: Framework.Case.Reg[]) =>{
    const topMenus: React.ReactNode[] = Array<JSX.Element>();
    topRegs.forEach(topReg => {
      const topMenu = this.getTopMenuItem(topReg);
      topMenus.push(topMenu);
    });
    return topMenus;
  }

  private getActionMenuKey(pathname: string): string[] {
    return pathname? [pathname] : ['/'];
  }
}


