import * as React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import { mainRegs } from "src/case/mainRegs";

import NoMatch from "../../NoMatch";
import { Sider } from "./inner/Sider";
import Content from "./inner/Content";
// import Footer from "./inner/Footer";
// import reg from 'src/case/report/viewReport/Reg';

// import { mainRegs } from "../../../case/mainRegs";
// const topRegs = mainRegs.getTopRegs();

interface IMainContentProps {
  topPath: string;
  isWaitHttpRequest: boolean;
  routeLocation: any;
}

export default class MainContent extends React.Component<IMainContentProps> {
  constructor(props: IMainContentProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: IMainContentProps) {
    //顶级路由不变化时，减少rander函数多次刷新
    return nextProps.topPath === this.props.topPath ? false : true
  }

  public render() {
    //获取sideregs,将Reg封装到RegCollection中
    const sideRegs = mainRegs.getSideRegsByRoutePath(this.props.topPath);

    let homeReg = this.props.topPath === "/" ? mainRegs.getRegByRoutePath("/") : null;

    return (

      <Layout>
        <Sider sideRegs={sideRegs} routeLocation={this.props.routeLocation} />

        {/* this.props.globalState.isWaitHttpRequest */}
        <Layout>
          <Content isWaitHttpRequest={this.props.isWaitHttpRequest}>
            <Switch>
              {/* 路由 */}
              {sideRegs.getRoutes()}
              {homeReg ? homeReg.getRoute() : null}
              <Route component={NoMatch} />
            </Switch>
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    );
  }


}
