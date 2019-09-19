import * as React from "react";
import { Card } from "antd";

import CaseCommon from "src/caseCommon/CaseCommon";
import { Const, TabList } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

// import PositionSystem from './inner/PositionSystem';
import { PageLayout, PageContent } from 'src/caseCommon/PageCommon';
import AsyncContent from "./async/AsyncContent";
// import Framework from 'src/framework/Framework';
// import PositionGroup from './inner/PositionGroup';
// const { TabPane } = Tabs;
// const { SubMenu } = Menu;


interface IPageProps { }
export default class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {
  public state: IState = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const data = await this.service.getInit();
    this.setState(data.initData);
  }


  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1);
    if (latestOpenKey && this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  public render() {
    // const { PS_columnCollection, PS_dataCollection } = this.state;
    const { tabKey } = this.state;
    return (
      <PageLayout>
        <PageContent>
          <Card
            className="qj-card-async"
            tabList={TabList}
            activeTabKey={tabKey}
            onTabChange={this.onTabChange}
            headStyle={{ paddingLeft: 0 }}
            bodyStyle={{ height: "calc(100vh - 151px)" }}
          >
            <AsyncContent tabKey={tabKey} />
          </Card>
        </PageContent>
      </PageLayout>
    );
  }

  private onTabChange = (key: string) => {
    this.setState({ "tabKey": key });
  };

}
