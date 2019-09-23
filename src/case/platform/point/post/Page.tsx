import * as React from "react";
import { Icon, Card } from "antd";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import { PageLayout, PageSide, PageContent } from "src/caseCommon/PageCommon";
import { Const, TabList } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import AsyncContent from "./async/AsyncContent";

interface IPageProps extends GlobalRedux.States.IGlobalStateProps { }

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    // const { isEnable, currOrgId, currOrgCode } = this.state;

    // const { treeData, tableData, total } = await this.service.getInit({ isEnable, pageSize, currentPage, orgParentId: currOrgId });

    // const currId = currOrgId || treeData.length ? treeData[0].orgId : undefined;

    // const currCode = currOrgCode || treeData.length ? treeData[0].orgCode : undefined;

    // const selKeys = currId ? [currId] : [];

    // const orgFlowData = await this.service.getOrganizationGraphics();

    // this.setState({ selectedKeys: selKeys, currOrgId: currId, currOrgCode: currCode, treeData, tableData, total, orgFlowData });

  }

  private renderTab = () => {
    return TabList.map(item => (
      {
        key: item.key,
        tab: <span><Icon type={item.icon} />{item.tab}</span>
      })
    )
  }

  public render() {

    const { treeData, selectedKeys, isEnable, tabKey } = this.state;

    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Card
            className="qj-card-async"
            tabList={this.renderTab()}
            activeTabKey={tabKey}
            onTabChange={this.handleTabChange}
            headStyle={{ paddingLeft: 0 }}
            bodyStyle={{ height: "calc(100vh - 151px)", padding: 0 }}
          >
            <AsyncContent tabKey={tabKey} />
          </Card>
        </PageContent>
      </PageLayout>
    );
  }

  //是否显示封存
  private handleShowChange = async (checked: boolean) => {
    this.setState({ isEnable: checked })
  }

  private handleTabChange = async (activeKey: string) => {
    this.setState({ tabKey: activeKey })
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)