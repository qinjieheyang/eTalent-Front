// 系统用例Case的入口页面
// 在这里集成（State数据模型、组件、Redux全局State数据模型、Redux全局动作发布器、后端Service调用）
// 最关键的是在这里处理所以的用户事件
import { Col, Row } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import CaseCommon from "src/caseCommon/CaseCommon";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import { Const } from "./Const";
import { LineChart1 } from './inner/LineChart1';
import { LineChart2 } from './inner/LineChart2';
import { Me } from "./inner/Me";
import { MyData } from "./inner/MyData";
import { MyStatistics } from "./inner/MyStatistics";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";

interface IPageProps extends GlobalRedux.States.IGlobalStateProps, RouteComponentProps {}

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {
    public state = initState;
    constructor(props: any) {
        super(props, Const, ServiceMock, Service);
    }

    public async init() {
        const data = await this.service.getInit();
        this.setState({ ...data.initData });
    }

    public render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Me userName={this.props.globalState.currentUser.userName} />
                    </Col>
                    <Col span={12}>
                        <MyData monthData={this.state.meMonthData} />
                    </Col>
                    <Col span={6}>
                        <MyStatistics />
                    </Col>
                </Row>
                <div> <LineChart1 /></div>
                <div> <LineChart2 /></div>
            </div>
        );
    }
}

export default GlobalRedux.ConnectPage.ConnectGlobalStateOnly(Page);
