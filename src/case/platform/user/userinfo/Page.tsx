import * as React from "react";
import { Card, Button } from "antd";
import { PageLayout, PageContent, PageSide } from "src/caseCommon/PageCommon";
// import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import Framework from "src/framework/Framework";

import { Const, Columns } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import { AddModal } from './AddModal';
import { DeleteModal } from './DeleteModal';
import { ImportModal } from './ImportModal';
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;


interface IPageProps extends GlobalRedux.Actions.IGlobalActionDispatcher { }

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

  private renderTags = () => {
    return this.state.filters.map((item: any) => {
      const value = item.isFilterNull ? "空值" : item.fieldValue;
      return (
        <Framework.Com.Tags.SearchTag key={item.fieldName} name={item.fieldName} label={item.fieldLabel} text={value} onClose={this.handleTagClose} />
      )
    })
  }

  public render() {

    const { tableData, pageSize, currentPage, total, treeData, selectedKeys, isEnable, visibleAdd, visibleDelete, confirmLoading, visibleImport } = this.state;

    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Card bodyStyle={{ padding: 16, height: "calc(100vh - 96px)" }} bordered={false}>
            <Framework.Com.Buttons.Tool.LeftArea>
              <Button type="primary" onClick={this.openAddModal}>新增</Button>
              <Button onClick={this.openDelModal}>删除</Button>
              <Button onClick={this.openImportModal}>导入</Button>
            </Framework.Com.Buttons.Tool.LeftArea>
            <div className="qj-tag-search-box" style={{ left: 248 }}>
              {this.renderTags()}
            </div>
            <div style={{ width: "100%", height: "calc(100% - 96px)" }}>
              <AdaptiveTable
                columns={this.GetColumns()}
                dataSource={tableData}
                pageSize={pageSize}
                current={currentPage}
                total={total}
                onPageChange={this.handlePageChange}
                onShowSizeChange={this.handleShowSizeChange}
                onFilterChange={this.handleFilterChange}
              />
            </div>
            <AddModal
              visible={visibleAdd}
              confirmLoading={confirmLoading}
              onOk={this.handleAdd}
              onCancel={this.handleAddCancel}
            />
            <DeleteModal
              visible={visibleDelete}
              confirmLoading={confirmLoading}
              onOk={this.handleDelete}
              onCancel={this.handleDelCancel}
            />
            <ImportModal
              visible={visibleImport}
              confirmLoading={confirmLoading}
              onOk={this.handleImport}
              onCancel={this.handleImportCancel}
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

  private handleFilterChange = (filters: any[]) => {
    this.setState({ filters })
  }

  private handleTagClose = (fieldName: string) => {
    const filters = this.state.filters;
    this.setState({ filters: filters.filter((item: any) => item.fieldName !== fieldName) })
  }

  private openAddModal = () => {
    this.setState({ visibleAdd: true });
  }

  private handleAdd = () => {
    this.setState({ visibleAdd: false });
  }

  private handleAddCancel = () => {
    this.setState({ visibleAdd: false });
  }

  private openDelModal = () => {
    this.setState({ visibleDelete: true });
  }

  private handleDelete = () => {
    this.setState({ visibleDelete: false });
  }

  private handleDelCancel = () => {
    this.setState({ visibleDelete: false });
  }

  private openImportModal = () => {
    this.setState({ visibleImport: true });
  }

  private handleImport = () => {
    this.setState({ visibleImport: false });
  }

  private handleImportCancel = () => {
    this.setState({ visibleImport: false });
  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)