import { Layout, LocaleProvider, Spin } from "antd";
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

interface IMainWrapperProps
    extends GlobalRedux.States.IGlobalStateProps,
        GlobalRedux.Actions.IGlobalActionDispatcher,
        RouteComponentProps {}

// CaseCommon.PageBase<IPageProps, IState ,IService>

class MainLayout extends CaseCommon.PageBase<IMainWrapperProps, IState, IService> {
    // public state = initState;
    public topUrl: string ="/";
    // public sideCollapsed: boolean;

    constructor(props: IMainWrapperProps) {
        super(props, Const, ServiceMock, Service);
        this.state = initState;
        this.initRoutePage();
    }

    public async init() {
        const initData = await this.service.getInit();
        this.setState({ msgRows: initData.msgRows, topUrl: initState.topUrl, topLoading: false });
        this.props.globalSetUserInfo(initData.currentUser);
        console.log(this.props,33)
    }

    public render() {
        if (Framework.CurrentUser.isLogin === false) {
            return <Redirect to={{ pathname: "/out/login" }} />;
        }
        const {location} = this.props;
        // console.log(this.props.globalState.isWaitHttpRequest)
        return (
            <LocaleProvider locale={zh_CN}>
                <Spin spinning={this.props.globalState.isWaitHttpRequest}>
                    <Layout>
                        <Header 
                            onLoginOff={this.handleLoginOff}
                            onMenuChange={this.handleTopMenuChange}
                            onThemeChange = {this.handleIsWait}
                            messages={this.state.msgRows}
                            topRegs={topRegs}
                            topUrl={this.topUrl}
                        />
                        <MainContent 
                            routePath={this.topUrl} 
                            routeLocation={location}
                            isWaitHttpRequest={this.props.globalState.isWaitHttpRequest}/>
                    </Layout>
                </Spin>
            </LocaleProvider>
        );
    }

    private handleLoginOff = () => {
        // debugger;
        Framework.CurrentUser.off();
        this.forceUpdate();
    };

    private handleTopMenuChange = (routePath: string) => {
        this.topUrl = routePath;
    }

    // private handleSideModeChange = (isCollapsed: boolean) => {
    //     this.sideCollapsed = isCollapsed;
    // }

    private initRoutePage(){
        const localPath = this.props.location.pathname;
        mainRegs.getAllRegs().forEach(reg => {
            if(reg.routePath == localPath){
                this.topUrl = reg.topPath;
            }
        })
    }

    private handleIsWait = () =>{
        // const action:any = GlobalRedux.Actions.GlobalAction.BrowserRefresh();
        GlobalRedux.globalStore.dispatch(GlobalRedux.Actions.GlobalAction.BrowserRefresh(true));
        setTimeout(() =>{
            GlobalRedux.globalStore.dispatch(GlobalRedux.Actions.GlobalAction.BrowserRefresh(false));
        }, 1000)
    }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(MainLayout);
