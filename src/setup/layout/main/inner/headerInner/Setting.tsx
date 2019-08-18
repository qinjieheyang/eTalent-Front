import { Dropdown, Icon, Menu } from "antd";
import * as React from "react";
import { IconBlock } from "./IconBlock";
// tslint:disable-next-line:no-empty-interface

const ThemeVariablesArray: Array<any> = [{
  '@primary-color': '#FF8C58',
  '@menu-item-color': '#d3d3d5',
  '@menu-item-active-bg': '#ff8c58',
  '@menu-item-active-color': '#fff',
  '@header-bg-color': '#495062',
  '@sider-bg-color': '#666C7B',
  '@collapes-bg-color': '#5D6474',
  '@logo-bg-color': '#495060'
},{
  '@primary-color': '#48B9C4',
  '@menu-item-color': '#d3d3d3',
  '@menu-item-active-bg': '#48B9C4',
  '@menu-item-active-color': '#fff',
  '@header-bg-color': '#243952',
  '@sider-bg-color': '#243952',
  '@collapes-bg-color': '#1C334E',
  '@logo-bg-color': '#48B9C4'
}]

export interface ISetProps {
  onThemeChange: () => void;
}

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
          <a onClick={()=>{this.handleClick(0)}} style={{background:"#ff8c58",color:"#fff"}}> 主题一 </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={()=>{this.handleClick(1)}} style={{background:"#48B9C4",color:"#fff"}}> 主题二 </a>
        </Menu.Item>
      </Menu>
    );
  };

  private handleClick = (theme:number) => {

    //更换主题颜色
      window["less"].modifyVars(
        ThemeVariablesArray[theme]
      )
      .then(() => {console.log('success')})
      .catch((error:any) => {
          console.log(error);
      });
      
      this.props.onThemeChange();
  };
}