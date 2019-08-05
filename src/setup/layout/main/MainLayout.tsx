import { Layout, LocaleProvider } from "antd";
// import "antd/dist/antd.css";
import zh_CN from "antd/lib/locale-provider/zh_CN";
//antd
import moment from "moment";
import "moment/locale/zh-cn";
import * as React from "react";
import { Route, RouteComponentProps, Switch, Redirect } from "react-router-dom";
import { mainRegs } from "../../../case/mainRegs";
import NoMatch from "../../NoMatch";
import Content from "./inner/Content";
import Footer from "./inner/Footer";
import Header from "./inner/Header";
import { Sider } from "./inner/Sider";
moment.locale("zh-cn");

import CaseCommon from "src/caseCommon/CaseCommon";
import Framework from "src/framework/Framework";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
const mainRoutes = mainRegs.getRoutes();

interface IMainLayoutprops
    extends GlobalRedux.States.IGlobalStateProps,
        GlobalRedux.Actions.IGlobalActionDispatcher,
        RouteComponentProps {}

// CaseCommon.PageBase<IPageProps, IState ,IService>
class MainLayout extends CaseCommon.PageBase<IMainLayoutprops, IState, IService> {
    public state = initState;
    constructor(props: IMainLayoutprops) {
        super(props, Const, ServiceMock, Service);
    }

    public async init() {
        const initData = await this.service.getInit();
        this.setState({ msgRows: initData.msgRows });
        this.props.globalSetUserInfo(initData.currentUser);
    }

    public render() {
        if (Framework.CurrentUser.isLogin === false) {
            return <Redirect to={{ pathname: "/out/login" }} />;
        }
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout>
                    <Sider mainRegs={mainRegs} routeLocation={this.props.location} />
                    <Layout>
                        <Header onLoginOff={this.handleLoginOff} messages={this.state.msgRows} />
                        {/* this.props.globalState.isWaitHttpRequest */}
                        <Content isWaitHttpRequest={this.props.globalState.isWaitHttpRequest}>
                            <Switch>
                                {/* 路由 */}
                                {mainRoutes}
                                <Route component={NoMatch} />
                            </Switch>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }

    private handleLoginOff = () => {
        debugger;
        Framework.CurrentUser.off();
        this.forceUpdate();
    };
}

export default GlobalRedux.ConnectPage.ConnectGlobal(MainLayout);
