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

interface IMainWrapperProps
    extends GlobalRedux.States.IGlobalStateProps,
        GlobalRedux.Actions.IGlobalActionDispatcher,
        RouteComponentProps {}

// CaseCommon.PageBase<IPageProps, IState ,IService>

class MainLayout extends CaseCommon.PageBase<IMainWrapperProps, IState, IService> {
    // public state = initState;
    private oldLocalPath: string;
    constructor(props: IMainWrapperProps) {
        super(props, Const, ServiceMock, Service);
        this.state = initState;
    }

    public async init() {
        const initData = await this.service.getInit();
        this.setState({ msgRows: initData.msgRows, topUrl: initState.topUrl });
        this.props.globalSetUserInfo(initData.currentUser);
        this.initRoutePage();
        console.log("initRoutePage")
    }

    public render() {
        if (Framework.CurrentUser.isLogin === false) {
            return <Redirect to={{ pathname: "/out/login" }} />;
        }
        const {location} = this.props;
        let localChanged: boolean = false;
        // console.log(this.oldLocalPath,location.pathname)
        if(this.oldLocalPath != location.pathname){
            localChanged = true;
            this.oldLocalPath = location.pathname;
        }
        return (
            <LocaleProvider locale={zh_CN}>
                <Layout>
                    <Header 
                        onLoginOff={this.handleLoginOff}
                        onMenuChange={this.handleTopMenuChange}
                        messages={this.state.msgRows}
                        topRegs={topRegs}
                        topUrl={this.state.topUrl}
                        logoCollapsed={this.state.sideCollapsed}
                    />
                    {
                        (this.state.topUrl === '')? null : (
                        <MainContent 
                            localChanged = {localChanged}
                            routePath={this.state.topUrl} 
                            routeLocation={location}
                            onChangeMenuMode={this.handleSideModeChange}
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

    private handleTopMenuChange = (routePath: string) => {
        this.setState({ topUrl: routePath });
    }

    private handleSideModeChange = (isCollapsed: boolean) => {
        this.setState({sideCollapsed: isCollapsed});
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
