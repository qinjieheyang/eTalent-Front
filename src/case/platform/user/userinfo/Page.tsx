import * as React from "react";
import { Card, Button } from "antd";
import { PageLayout, PageContent, PageSide } from "src/caseCommon/PageCommon";
import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import Framework from "src/framework/Framework";

import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;


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
    const { treeData } = this.state;
    const isEnable = false;
    const currOrgId = String(0);
    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={[currOrgId]} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Card bodyStyle={{ padding: 16, height: "calc(100vh - 151px)" }} bordered={false}>
            <Framework.Com.Buttons.Tool.LeftArea>
              <Button type="primary">重置密码</Button>
            </Framework.Com.Buttons.Tool.LeftArea>
            <AdaptiveTable
              columns={columns}
              dataSource={dataSource}
              minusHeight={224}
            />
          </Card>
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