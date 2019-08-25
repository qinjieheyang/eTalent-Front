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


interface IMainWrapperProps
    extends GlobalRedux.States.IGlobalStateProps,
        GlobalRedux.Actions.IGlobalActionDispatcher,
        RouteComponentProps {}

class MainLayout extends CaseCommon.PageBase<IMainWrapperProps, IState, IService> {
    public state: IState;
    public topUrl: string ="/";
    // public sideCollapsed: boolean;

    constructor(props: IMainWrapperProps) {
        super(props, Const, ServiceMock, Service);
        this.state = initState;
        this.initPage();
        this.props.globalSetMeunRegs(mainRegs);
    }

    public async init() {
        if (Framework.CurrentUser.isLogin) {
            const initData = await this.service.getInit();
            this.setState({ msgRows: initData.msgRows, topUrl: initState.topUrl});
            this.props.globalSetUserInfo(initData.currentUser);
        }
    }

    public render() {
        if (Framework.CurrentUser.isLogin === false) {
            return <Redirect to={{ pathname: "/out/login" }} />;
        }
        const {location, globalState} = this.props;
        return (
            <LocaleProvider locale={zh_CN}>
                <Spin spinning={globalState.loading}>
                    <Layout>
                        <Header 
                            onMenuChange={this.handleTopMenuChange}
                            messages={this.state.msgRows}
                            topUrl={this.topUrl}
                        />
                        <MainContent 
                            topPath={this.topUrl} 
                            routeLocation={location}
                            isWaitHttpRequest={this.props.globalState.isWaitHttpRequest}/>
                    </Layout>
                </Spin>
            </LocaleProvider>
        );
    }

    

    private handleTopMenuChange = (routePath: string) => {
        this.topUrl = routePath;
    }

    private initPage(){
        const localPath = this.props.location.pathname;
        mainRegs.getAllRegs().forEach(reg => {
            if(reg.routePath == localPath){
                this.topUrl = reg.topPath;
            }
        })
    }


}

export default GlobalRedux.ConnectPage.ConnectGlobal(MainLayout);
