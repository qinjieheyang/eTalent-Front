import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import { PageLayout, PageSide, PageContent } from "src/caseCommon/PageCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import Content from "./inner/Content";

import "./Style.less";

interface IPageProps extends GlobalRedux.Actions.IGlobalActionDispatcher, RouteComponentProps { }

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const treeData = await this.service.getInit();

    const tableData = await this.service.getTableDate();

    this.setState({ treeData, tableData });

  }

  public render() {
    const { treeData } = this.state;
    const isEnable = false;
    const currOrgId = "";
    return (
      <PageLayout>
        <PageSide>
        <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={[currOrgId]} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Content/>
        </PageContent>
      </PageLayout>
    );
  }



  private handleShowChange = (checked: boolean) => {

  }


  private handleSelectTreeNode = (selectedKeys: string[]) => {

  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)