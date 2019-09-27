import * as React from "react";
import { Card, Button } from "antd";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon from "src/caseCommon/CaseCommon";
import { PageLayout, PageSide, PageContent } from "src/caseCommon/PageCommon";
import { Const, TabList } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import AsyncContent from "./async/AsyncContent";
import { RoleTree } from './RoleTree';

interface IPageProps extends GlobalRedux.States.IGlobalStateProps { }

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {

    const treeData = await this.service.searchRoleTree();

    this.setState({ treeData });

  }

  public render() {

    const { treeData, selectedKeys, tabKey } = this.state;

    return (
      <PageLayout>
        <PageSide>
          <RoleTree onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} >
              <Button>新增</Button>
              <Button>编辑</Button>
              <Button>删除</Button>
          </RoleTree>
        </PageSide>
        <PageContent>
          <Card
            className="qj-card-async"
            tabList={TabList}
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