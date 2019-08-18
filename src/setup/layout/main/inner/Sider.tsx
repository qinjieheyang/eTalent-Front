import { Layout } from "antd";
import * as React from "react";
import * as Framework from "src/framework/Framework";
import { Collapes } from "./siderInner/Collapes";
import { SiderMenu } from "./siderInner/SiderMenu";
import "./Sider.less";
interface ISiderProps {
  sideRegs: Framework.Case.RegCollection;
  // onChangeMenuMode: (isCollapsed: boolean) => void;
  routeLocation: any;
}
interface ISiderState {
  /** 是否折叠 */
  collapsed: boolean;
  /** 是否是按钮触发折叠,用于保留状态 */
  expansionMode: boolean;
}

/** 菜单边框 */
export class Sider extends React.Component<ISiderProps, ISiderState> {
  public state = {
    // 是否折叠菜单
    collapsed: false,
    expansionMode: true
  };

  public render() {
    // const height = document.documentElement.clientHeight;
    const pathname: string = this.props.routeLocation.pathname;

    return (
      <Layout.Sider
        className="qj-sidebar"
        width={240}
        trigger={null}
        collapsible={true}
        collapsed={this.state.collapsed}
      >
        <Collapes
          collapsed={this.state.collapsed}
          onClickToggle={this.handleClickToggle}
        />
        {/* <div
          onMouseEnter={this.handleMouserEnter}
          onMouseLeave={this.handleMouserLeave}
        > */}
          <SiderMenu
            collapsed={this.state.collapsed}
            sideRegs={this.props.sideRegs}
            urlPath={pathname}
          />
        {/* </div> */}
      </Layout.Sider>
    );
  }

  private handleClickToggle = () => {
    
    this.setState({
      collapsed: !this.state.collapsed,
      expansionMode: this.state.collapsed
    });
    
    // this.props.onChangeMenuMode(!this.state.collapsed);

    const head = document.getElementById("topHeader");
    const logo = document.getElementById("logo-img");

    if(head){
      this.state.collapsed ? head.classList.remove("qj-header-collapsed") : head.classList.add("qj-header-collapsed");
    }
    
    if(logo){
      logo.setAttribute("src", this.state.collapsed ? "/img/logo.png" : "/img/logo-collapsed.png")
    }

  };

  // private handleMouserEnter = () =>{
  //   //是按钮触发的展开，直接返回
  //   if(this.state.expansionMode) return;
  //   this.setState({
  //     collapsed: false
  //   });
  //   this.props.onChangeMenuMode(false);
  // }

  // private handleMouserLeave = () =>{
  //   if(this.state.expansionMode) return;
  //   this.setState({
  //     collapsed: true
  //   });
  //   this.props.onChangeMenuMode(true);
  // }
}
