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

    const { isEnable, pageSize, currentPage } = this.state;

    const treeData = await this.service.getOrganizationTree();
    if (!treeData.length) {
      return;
    }
    const currOrgId = treeData[0].orgId;
    const tableData = await this.service.getOrganizationList({
      orgParentId: currOrgId,
      isEnable,
      currentPage,
      pageSize,
    });

    this.setState({ currOrgId, treeData, tableData });

  }

  public render() {

    const { treeData, tableData, currOrgId, isEnable, currentPage, pageSize } = this.state;

    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={[currOrgId]} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Content dataSource={tableData} currentPage={currentPage} pageSize={pageSize} onTabChange={this.handleTabChange} />
        </PageContent>
      </PageLayout>
    );
  }



  private handleShowChange = (checked: boolean) => {
    // this.state.treeData
    this.setState({
      isEnable: checked
    })
  }


  private handleSelectTreeNode = (selectedKeys: number[]) => {

  }

  private handleTabChange = (activeKey: string) => {

  }
}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)