import * as React from "react";
import { Tabs, Card, Button } from "antd";
import { PageLayout, PageContent, PageSide } from "src/caseCommon/PageCommon";
import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import Framework from "src/framework/Framework";

import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
const { TabPane } = Tabs;
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;


interface IPageProps extends GlobalRedux.Actions.IGlobalActionDispatcher, RouteComponentProps { }

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  private showAll: boolean = false; //显示封存

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const treeData = await this.service.getInit();

    const tableData = await this.service.getTableDate();

    this.setState({ treeData, tableData });
    // console.log(treeData,333)
  }

  public render() {

    const columns = [
      {
        title: '用户名',
        key: 'name',
        dataIndex: 'name',
        width: 150,
        enableSearch: false
      },
      {
        title: '企业名称',
        key: '1',
        dataIndex: 'name',
        width: 150,
        enableSearch: false
      },
      {
        title: '邮箱',
        key: '2',
        dataIndex: 'name',
        width: 150,
        enableSearch: false
      },
      {
        title: '手机号',
        key: '3',
        dataIndex: 'name',
        width: 150,
        enableSearch: false
      },
      {
        title: '注册日期',
        key: '4',
        dataIndex: 'name',
        width: 150,
        enableSearch: false
      },
    ]
    const dataSource: any = [
      {
        name: "xxxx"
      },
      {
        name: "xxxx"
      },
      {
        name: "xxxx"
      },
      {
        name: "xxxx"
      },
    ];
    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={this.showAll} onShowChange={this.onShowChange} treeData={this.state.treeData} />
        </PageSide>
        <PageContent>
          <Tabs size="large" animated={false} tabBarStyle={{ marginBottom: 0, background: "#fff" }}>
            <TabPane key="1" className="qj-depart-tab-pane"
              tab="用户信息">
              <Card style={{ margin: 16 }} bodyStyle={{ padding: 16, height: "calc(100vh - 151px)" }} bordered={false}>
                <div className="qj-page-title-btns">
                  <Button type="primary">重置密码</Button>
                </div>
                <AdaptiveTable
                  columns={columns}
                  dataSource={dataSource}
                  minusHeight={279}
                />
              </Card>
            </TabPane>
          </Tabs>
        </PageContent>
      </PageLayout>
    );
  }

  private onShowChange = (checked: boolean) => {

  }
}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)