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
    const treeData = await this.service.getOrganizationTree();

    this.setState({ treeData });

  }

  public render() {
    const { treeData, selectedKeys, isEnable } = this.state;
    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Content />
        </PageContent>
      </PageLayout>
    );
  }

  //是否显示封存
  private handleShowChange = async (checked: boolean) => {
    this.setState({ isEnable: checked })
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)