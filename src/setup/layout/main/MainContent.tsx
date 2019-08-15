import * as React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import { mainRegs} from "../../../case/mainRegs";

import NoMatch from "../../NoMatch";
import { Sider } from "./inner/Sider";
import Content from "./inner/Content";
// import Footer from "./inner/Footer";
// import reg from 'src/case/report/viewReport/Reg';

// import { mainRegs } from "../../../case/mainRegs";
const topRegs = mainRegs.getTopRegs();

interface IMainContentProps {
  routePath: string;
  isWaitHttpRequest: boolean;
  routeLocation: any;
}

export default class MainContent extends React.Component<IMainContentProps> {
  constructor(props: any) {
    super(props);
    console.log(888)
  }

  // shouldComponentUpdate(){
  //   // console.log(this.props.localChanged)
  //   return this.props.localChanged;
  // }

  public render() {
    //获取sideregs,将Reg封装到RegCollection中
    const sideRegs = mainRegs.getSideRegsByRoutePath(this.props.routePath);
    const topReg = mainRegs.getTopRegByRoutePath(this.props.routePath);
    // console.log(22222)
    return (

      <Layout>
          <Sider sideRegs={sideRegs} routeLocation={this.props.routeLocation} />
          
          {/* this.props.globalState.isWaitHttpRequest */}
          <Layout>
              <Content isWaitHttpRequest={this.props.isWaitHttpRequest}>
                  <Switch>
                      {/* 路由 */}
                      {sideRegs.getRoutes()}
                      {topReg ? topReg.getRoute() : this.getHomeRoute()}
                      <Route component={NoMatch} />
                  </Switch>
              </Content>
              {/* <Footer /> */}
          </Layout>
      </Layout>
    );
  }

  private getHomeRoute = ()=>{
    let homeRoute;
    topRegs.forEach(reg => {
      if(reg.isHomePage()){
        homeRoute = reg.getRoute();
      }
    })
    return homeRoute;
  }
}
