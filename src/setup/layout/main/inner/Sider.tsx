import { Layout } from "antd";
import * as React from "react";
import * as Framework from "src/framework/Framework";
import { Collapes } from "./Collapes";
import { SiderMenu } from "./siderInner/SiderMenu";
import "./Sider.less";
interface ISiderProps {
  sideRegs: Framework.Case.RegCollection;

  routeLocation: any;
}
interface ISiderState {
  /** 是否折叠 */
  collapsed: boolean;
}

/** 菜单边框 */
export class Sider extends React.Component<ISiderProps, ISiderState> {
  public state = {
    // 是否折叠菜单
    collapsed: false
  };

  public render() {
    // const height = document.documentElement.clientHeight;
    const pathname: string = this.props.routeLocation.pathname;

    return (
      <Layout.Sider
        className="qj-sidebar"
        style={{  }}
        trigger={null}
        collapsible={true}
        collapsed={this.state.collapsed}
      >
        <Collapes
          collapsed={this.state.collapsed}
          onClickToggle={this.handleClickToggle}
        />

        <SiderMenu
          collapsed={this.state.collapsed}
          sideRegs={this.props.sideRegs}
          urlPath={pathname}
        />
      </Layout.Sider>
    );
  }

  private handleClickToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
}
