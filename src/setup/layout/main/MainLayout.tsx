import { Layout, LocaleProvider } from "antd";
// import "antd/dist/antd.css";
import zh_CN from "antd/lib/locale-provider/zh_CN";
//antd
import moment from "moment";
import "moment/locale/zh-cn";
import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { mainRegs } from "../../../case/mainRegs";
import Header from "./inner/Header";
import MainContent from "./MainContent";
moment.locale("zh-cn");

import CaseCommon from "src/caseCommon/CaseCommon";
import Framework from "src/framework/Framework";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";

const topRegs = mainRegs.getTopRegs();

interface IMainWrapperprops
    extends GlobalRedux.States.IGlobalStateProps,
        GlobalRedux.Actions.IGlobalActionDispatcher,
        RouteComponentProps {}

// CaseCommon.PageBase<IPageProps, IState ,IService>
class MainLayout extends CaseCommon.PageBase<IMainWrapperprops, IState, IService> {
    // public state = initState;
    constructor(props: IMainWrapperprops) {
        super(props, Const, ServiceMock, Service);
        this.state = initState;
    }

    public async init() {
        const initData = await this.service.getInit();
        this.setState({ msgRows: initData.msgRows, topUrl: initState.topUrl });
        this.props.globalSetUserInfo(initData.currentUser);
        this.initRoutePage();
    }

    public render() {
        if (Framework.CurrentUser.isLogin === false) {
            return <Redirect to={{ pathname: "/out/login" }} />;
        }
        const {location} = this.props;
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout>
                    <Header 
                        onLoginOff={this.handleLoginOff}
                        onMenuChange={this.handleTopMenuChange}
                        messages={this.state.msgRows}
                        topRegs={topRegs}
                        topUrl={this.state.topUrl}
                    />
                    {
                        this.state.topUrl === ''? null : (
                        <MainContent 
                            routePath={this.state.topUrl} 
                            routeLocation={location}
                            isWaitHttpRequest={this.props.globalState.isWaitHttpRequest}/>
                        )
                    }
                </Layout>
            </LocaleProvider>
        );
    }

    private handleLoginOff = () => {
        // debugger;
        Framework.CurrentUser.off();
        this.forceUpdate();
    };

    // private getTopRoutePath = (): string =>{
    //     // const {location} = this.props;
    //     // console.log(location.pathname,22)
    //     // console.log(mainRegs.getParentRegByRoutePath(location.pathname),33)
    //     let topPath = '';
    //     return topPath;
    // }
    private handleTopMenuChange = (routePath: string) => {
        this.setState({ topUrl: routePath });
    }

    private initRoutePage(){
        const localPath = this.props.location.pathname;
        mainRegs.getAllRegs().forEach(reg => {
            if(reg.routePath == localPath){
                this.setState({topUrl: reg.topPath});
            }
        })
    }
}

export default GlobalRedux.ConnectPage.ConnectGlobal(MainLayout);
