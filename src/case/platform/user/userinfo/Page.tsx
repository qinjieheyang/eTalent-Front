import * as React from "react";
import { Button } from "antd";
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
      <CaseCommon.PageLayout>
        <CaseCommon.PageSide>
          <OrgTree showAll={this.showAll} onShowChange={this.onShowChange} treeData={this.state.treeData} />
        </CaseCommon.PageSide>
        <CaseCommon.PageContent>
          <CaseCommon.PageCard title={
            <Button type="primary">密码重置</Button>
          }>
            <AdaptiveTable
              columns={columns}
              dataSource={dataSource}
              minusHeight={199}
            />
          </CaseCommon.PageCard>
        </CaseCommon.PageContent>
      </CaseCommon.PageLayout>
    );
  }

  private onShowChange = (checked: boolean) => {

  }
}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)