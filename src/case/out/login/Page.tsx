import { Col, Row } from "antd";
import * as React from "react";

// import { Redirect } from "react-router-dom";

import GlobalRedux from "src/globalRedux/GlobalRedux";

import CaseCommon from "src/caseCommon/CaseCommon";

import { Redirect } from "react-router";
import Framework from "src/framework/Framework";
import { Const } from "./Const";
import { XLogin } from "./inner/XLogin";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";

class Page extends CaseCommon.PageBase<any, IState, IService> {
    public state = initState;
    constructor(props: any) {
        super(props, Const, ServiceMock, Service);
    }

    public init() {}

    public render() {
        if (Framework.CurrentUser.isLogin === true) {
            // 页面跳转
            return <Redirect to={{ pathname: "/" }} />;
        }

        return (
            <Row
                style={{
                    height: "100%",
                    backgroundImage: "url(/img/1.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%"
                }}
            >
                <Col span={24} style={{ height: "100%" }}>
                    <XLogin onLoginSubmit={this.handleLoginSubmit} />
                </Col>
            </Row>
        );
    }

    private handleLoginSubmit = async (values: any) => {
        const data = await this.service.login(values);
        if (data.token == null || data.userName == null || data.loginName == null) {
            return;
        }

        Framework.CurrentUser.login(data.userName, data.loginName, data.token);
        this.forceUpdate();
    };
}

export default GlobalRedux.ConnectPage.ConnectGlobalStateOnly(Page);
