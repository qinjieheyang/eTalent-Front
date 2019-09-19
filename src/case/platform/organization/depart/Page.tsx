import * as React from "react";
import { Tabs, Button, Menu, Icon, Card } from "antd";
import Framework from "src/framework/Framework";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import { PageLayout, PageSide, PageContent } from "src/caseCommon/PageCommon";
import { Const, TabKey } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
import * as InnerIndex from "./inner/Index";

const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;
const { DropdownMore } = Framework.Com.Dropdowns;
const { TabPane } = Tabs;

const { AddModal, DeleteModal, SealModal, UnSealModal, MergeModal, ImportModal, DepartTableColumns, OrgFlow } = InnerIndex;

import "./Style.less";

interface IPageProps extends GlobalRedux.States.IGlobalStateProps { }

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);

  }

  private renderMenu = () => (
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

  // private renderCard = (children: any) => (
  //   <Card bodyStyle={{ padding: 16, height: "calc(100vh - 151px)", minWidth: 1150 }} bordered={false}>
  //     {children}
  //   </Card>
  // )

  public async init() {

    const { isEnable, pageSize, currentPage, currOrgId, currOrgCode } = this.state;

    const { treeData, tableData, total } = await this.service.getInit({ isEnable, pageSize, currentPage, orgParentId: currOrgId });

    const currId = currOrgId || treeData.length ? treeData[0].orgId : undefined;

    const currCode = currOrgCode || treeData.length ? treeData[0].orgCode : undefined;

    const selKeys = currId ? [currId] : [];

    const orgFlowData = await this.service.getOrganizationGraphics();

    this.setState({ selectedKeys: selKeys, currOrgId: currId, currOrgCode: currCode, treeData, tableData, total, orgFlowData });

  }

  public render() {

    const { treeData, tableData, selectedKeys, isEnable, pageSize, currentPage, total, orgFlowData, currOrgCode, visibleAdd, visibleDelete, visibleSeal, visibleUnSeal, visibleMerge, confirmLoading, visibleImport } = this.state;

    return (
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <Tabs size="large" animated={false} tabBarStyle={{ marginBottom: 0, background: "#fff" }} onChange={this.handleTabChange}>
            <TabPane key="1" className="qj-depart-tab-pane"
              tab={<span><Icon type="table" />机构表</span>}>
              {/* {this.renderCard()} */}
              <Card bodyStyle={{ padding: 16, height: "calc(100vh - 151px)", minWidth: 1150 }} bordered={false}>
                <Framework.Com.Buttons.Tool.LeftArea>
                  <Button type="primary" onClick={this.openAddModal}>新增</Button>
                  <Button onClick={this.openDelModal}>删除</Button>
                  <DropdownMore menu={this.renderMenu()}></DropdownMore>
                </Framework.Com.Buttons.Tool.LeftArea>
                <AdaptiveTable
                  columns={DepartTableColumns}
                  dataSource={tableData}
                  minusHeight={279}
                  pageSize={pageSize}
                  current={currentPage}
                  total={total}
                  onPageChange={this.handlePageChange}
                  onShowSizeChange={this.handleShowSizeChange}
                />
              </Card>
            </TabPane>
            <TabPane key="2" className="qj-depart-tab-pane"
              tab={<span><Icon type="apartment" />机构图</span>}>
              <Card bodyStyle={{ padding: 16, height: "calc(100vh - 151px)" }} bordered={false}>
                <OrgFlow data={orgFlowData} parentCode={currOrgCode} />
              </Card>
            </TabPane>
          </Tabs>
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
        </PageContent>
      </PageLayout>
    );
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

  //是否显示封存
  private handleShowChange = async (checked: boolean) => {
    const { pageSize, currOrgId } = this.state;
    const { tableData } = await this.service.getOrganizationList({
      orgParentId: currOrgId,
      isEnable: checked,
      currentPage: 1,
      pageSize
    });
    this.setState({ currentPage: 1, tableData, isEnable: checked })
  }

  private handleTabChange = async (activeKey: string) => {
    if (activeKey === TabKey.Table) {
      // const { pageSize, currOrgId } = this.state;
      // const { tableData } = await this.service.getOrganizationList({
      //   orgParentId: currOrgId,
      //   isEnable: checked,
      //   currentPage: 1,
      //   pageSize
      // });
    }
    if (activeKey === TabKey.Flow) {
      // console.log(2)
    }
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
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
}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)