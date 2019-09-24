import * as React from "react";
import { Card } from "antd";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import { OrgFlow } from "./OrgFlow";

import "./Style.less";

interface IPageProps extends GlobalRedux.States.IGlobalStateProps { }
export default class Page extends CaseCommon.PageAsyncBase<IPageProps, IState, IService> {
  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {

    const orgFlowData = await this.service.getOrganizationGraphics();

    this.setState({ currOrgCode: "1", orgFlowData: orgFlowData });

  }
  public render() {
    const { orgFlowData, currOrgCode } = this.state;

    return (
      <Card style={{ height: "100%", margin: 1 }} bodyStyle={{ padding: 16, height: "100%" }} bordered={false}>
        <OrgFlow data={orgFlowData} parentCode={currOrgCode} />
      </Card>
    )
  }
}
