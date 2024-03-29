import * as React from "react";
import { Button, Menu, Card } from "antd";
import Framework from "src/framework/Framework";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import { AddModal } from './AddModal';
import { DeleteModal } from './DeleteModal';
import { SealModal } from './SealModal';
import { UnSealModal } from './UnSealModal';
import { MergeModal } from './MergeModal';
import { ImportModal } from './ImportModal';
import { DepartTableColumns } from './DepartTableColumns';

const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;
const { DropdownMore } = Framework.Com.Dropdowns;

interface IPageProps extends GlobalRedux.States.IGlobalStateProps { }
class Page extends CaseCommon.PageAsyncBase<IPageProps, IState, IService> {

  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const { isEnable, pageSize, currentPage, currOrgId, currOrgCode } = this.state;

    const { treeData, tableData, total } = await this.service.getInit({ isEnable, pageSize, currentPage, orgParentId: currOrgId });

    const currId = currOrgId || treeData.length ? treeData[0].orgId : undefined;

    const currCode = currOrgCode || treeData.length ? treeData[0].orgCode : undefined;

    const selKeys = currId ? [currId] : [];

    const orgFlowData = await this.service.getOrganizationGraphics();

    this.setState({ selectedKeys: selKeys, currOrgId: currId, currOrgCode: currCode, treeData, tableData, total, orgFlowData });

  }

  private renderMore = () => (
    <Menu style={{ textAlign: "center" }}>
      <Menu.Item onClick={this.openSealModal}>封存</Menu.Item>
      <Menu.Item onClick={this.openUnSealModal}>解封</Menu.Item>
      <Menu.Item onClick={this.openMergeModal}>合并</Menu.Item>
      <Menu.Item onClick={this.openMergeModal}>划转</Menu.Item>
      <Menu.Item>排序</Menu.Item>
      <Menu.Item onClick={this.openImportModal}>导入</Menu.Item>
      <Menu.Item
        onClick={
          () => Framework.Utils.UtilDownload.Img({
            url: "https://qinjee-datacenter-1253673776.cos.ap-guangzhou.myqcloud.com/user/logo.png",
          })
        }>导出</Menu.Item>
    </Menu>
  );

  private renderTags = () => {
    return this.state.filters.map(item => {
      const value = item.isFilterNull ? "空值" : item.fieldValue;
      return (
        <Framework.Com.Tags.SearchTag key={item.fieldName} name={item.fieldName} label={item.fieldLabel} text={value} onClose={this.handleTagClose} />
      )
    })
  }

  public render() {

    const { tableData, pageSize, currentPage, total, visibleAdd, visibleDelete, visibleSeal, visibleUnSeal, visibleMerge, confirmLoading, visibleImport, addModalTitle } = this.state;

    return (

      <Card style={{ height: "100%", margin: 1 }} bodyStyle={{ padding: 16, height: "100%" }} bordered={false}>
        <Framework.Com.Buttons.Tool.LeftArea>
          <Button type="primary" onClick={()=> {this.openAddModal()}}>新增</Button>
          <Button onClick={this.openDelModal}>删除</Button>
          <DropdownMore menu={this.renderMore()}></DropdownMore>
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
            onSelectRows={this.handleSelectRows}
            onFilterChange={this.handleFilterChange}
          />
        </div>
        <AddModal
          visible={visibleAdd}
          title={addModalTitle}
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
        <SealModal
          visible={visibleSeal}
          confirmLoading={confirmLoading}
          onOk={this.handleSeal}
          onCancel={this.handleSealCancel}
        />
        <UnSealModal
          visible={visibleUnSeal}
          confirmLoading={confirmLoading}
          onOk={this.handleUnSeal}
          onCancel={this.handleUnSealCancel}
        />
        <MergeModal
          visible={visibleMerge}
          confirmLoading={confirmLoading}
          onOk={this.handleMerge}
          onCancel={this.handleMergeCancel}
        />
        <ImportModal
          visible={visibleImport}
          confirmLoading={confirmLoading}
          onOk={this.handleImport}
          onCancel={this.handleImportCancel}
        />
      </Card>

    );
  }

  private GetColumns = () => {

    const getHandler = (dataType: string | undefined) => {
      if (dataType === "linkText") {
        return {
          handler: {
            onLinkClick: (row: any) => {
              this.openAddModal("编辑信息");
            }
          }
        }
      }
      return {};
    }

    return DepartTableColumns.map((col: any) => {

      return {
        ...col,
        ...getHandler(col.dataType)
      }
    })
  }

  //翻页：pagesize 改变
  private handleShowSizeChange = async (current: number, size: number) => {
    const { isEnable, currOrgId } = this.state;
    const { tableData } = await this.service.getOrganizationList({
      orgParentId: currOrgId,
      isEnable,
      currentPage: 1,
      pageSize: size,
    });
    this.setState({ pageSize: size, currentPage: 1, tableData })
  }

  //翻页：页码改变
  private handlePageChange = async (page: number, pageSize: number) => {
    const { isEnable, currOrgId } = this.state;
    const { tableData } = await this.service.getOrganizationList({
      orgParentId: currOrgId,
      isEnable,
      currentPage: page,
      pageSize,
    });
    this.setState({ currentPage: page, tableData });
  }

  private openAddModal = (title?: string) => {
    this.setState({ visibleAdd: true, addModalTitle: title });
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

  private openSealModal = () => {
    this.setState({ visibleSeal: true });
  }

  private handleSeal = () => {
    this.setState({ visibleSeal: false });
  }

  private handleSealCancel = () => {
    this.setState({ visibleSeal: false });
  }

  private openUnSealModal = () => {
    this.setState({ visibleUnSeal: true });
  }

  private handleUnSeal = () => {
    this.setState({ visibleUnSeal: false });
  }

  private handleUnSealCancel = () => {
    this.setState({ visibleUnSeal: false });
  }

  private openMergeModal = () => {
    this.setState({ visibleMerge: true });
  }

  private handleMerge = () => {
    this.setState({ visibleMerge: false });
  }

  private handleMergeCancel = () => {
    this.setState({ visibleMerge: false });
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

  //表格checkbox选中
  private handleSelectRows = (selectRows: any[]) => {
    this.setState({
      checkedList: selectRows.map(row => (
        {
          value: row.positionGroupId,
          name: row.positionGroupName
        })
      )
    })
  }

  private handleFilterChange = (filters: any[]) => {
    this.setState({ filters })
  }

  private handleTagClose = (fieldName: string) => {
    const filters = this.state.filters;
    this.setState({ filters: filters.filter(item => item.fieldName !== fieldName) })
  }
}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)