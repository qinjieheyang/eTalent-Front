import * as React from "react";
import { Card, Button } from "antd";
import { PageLayout, PageContent, PageSide } from "src/caseCommon/PageCommon";
import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import Framework from "src/framework/Framework";

import { Const, Columns } from "./Const";
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
    const { pageSize, currentPage } = this.state;

    const treeData = await this.service.getOrganizationTree();

    const { total, tableData } = await this.service.getUserArchiveList({ pageSize, currentPage });

    this.setState({ treeData, total, tableData });
  }

  public render() {

    const { tableData, pageSize, currentPage, total, treeData, selectedKeys, isEnable } = this.state;

    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Card bodyStyle={{ padding: 16, height: "calc(100vh - 151px)" }} bordered={false}>
            <Framework.Com.Buttons.Tool.LeftArea>
              <Button type="primary">重置密码</Button>
            </Framework.Com.Buttons.Tool.LeftArea>
            <AdaptiveTable
              columns={this.GetColumns()}
              dataSource={tableData}
              minusHeight={224}
              pageSize={pageSize}
              current={currentPage}
              total={total}
              onPageChange={this.handlePageChange}
              onShowSizeChange={this.handleShowSizeChange}
            />
          </Card>
        </PageContent>
      </PageLayout>
    );
  }
  private GetColumns = () => {
    // let width = 0;
    const getHandler = (dataType: string | undefined) => {
      if (dataType === undefined) return {};
      return {
        handler: {
          onLinkClick: (row: any) => {
            // this.openAddModal("编辑信息");
          }
        }
      }
    }

    return Columns.map(col => {
      // width += col.width || 150;
      return {
        ...col,
        dataIndex: col.key,
        ...getHandler(col.dataType)
      }
    })
  }

  //翻页：pagesize 改变
  private handleShowSizeChange = async (current: number, size: number) => {
    const { tableData } = await this.service.getUserArchiveList({
      currentPage: 1,
      pageSize: size,
    });
    this.setState({ pageSize: size, currentPage: 1, tableData });
  }

  //翻页：页码改变
  private handlePageChange = async (page: number, pageSize: number) => {
    const { tableData } = await this.service.getUserArchiveList({
      currentPage: page,
      pageSize,
    });
    this.setState({ currentPage: page, tableData });
  }

  private handleShowChange = (checked: boolean) => {

  }


  private handleSelectTreeNode = (selectedKeys: string[]) => {

  }
}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)