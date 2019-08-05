import { Layout } from "antd";
import * as React from "react";
import * as Framework from "src/framework/Framework";
import { Logo } from "./Logo";
import { SiderMenu } from "./siderInner/SiderMenu";

interface ISiderProps {
  mainRegs: Framework.Case.RegCollection;

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
    collapsed: true
  };

  public render() {
    // const height = document.documentElement.clientHeight;
    const pathname: string = this.props.routeLocation.pathname;

    return (
      <Layout.Sider
        style={{ overflow: "hidden", height: "100vh" }}
        trigger={null}
        collapsible={true}
        collapsed={this.state.collapsed}
      >
        <Logo
          collapsed={this.state.collapsed}
          onClickToggle={this.handleClickToggle}
        />

        <SiderMenu
          collapsed={this.state.collapsed}
          mainRegs={this.props.mainRegs}
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
