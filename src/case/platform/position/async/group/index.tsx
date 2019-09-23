import * as React from "react";
import { Button, Menu } from "antd";
import Framework from 'src/framework/Framework';
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const, Columns } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

import { AddModal } from "./AddModal";
import { DeleteModal } from "./DeleteModal";
import { UtilMessage, MessageType } from 'src/framework/utils/Index';

const { DropdownMore } = Framework.Com.Dropdowns;
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

interface IProps { }
export default class Group extends CaseCommon.PageAsyncBase<IProps, IState, IService> {

  public state: IState = initState;

  public checkedValues: any[];

  constructor(props: IProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const { pageSize, currentPage } = this.state;

    const { total, tableData } = await this.service.getAllPositionGroup({ pageSize, currentPage });

    this.setState({
      tableData,
      total
    })
  }

  private renderMore = () => (
    <Menu style={{ textAlign: "center" }}>
      <Menu.Item>排序</Menu.Item>
      <Menu.Item
        onClick={this.handleExport}>导出
      </Menu.Item>
    </Menu>
  );

  public render() {
    const { tableData, pageSize, currentPage, total, confirmLoading, visibleAdd, visibleDelete, addModalTitle, checkedList } = this.state;

    const addProps = { visible: visibleAdd, confirmLoading, onOk: this.handleAdd, onCancel: this.handleAddCancel, title: addModalTitle };
    const delProps = { visible: visibleDelete, confirmLoading, onOk: this.handleDelete, onCancel: this.handleDelCancel, checkedList, onCheckedChange: this.handleCheckChange };
    return (
      <div style={{ height: "100%", padding: 16 }}>
        <Framework.Com.Buttons.Tool.LeftArea>
          <Button type="primary" onClick={() => { this.openAddModal() }}>新增</Button>
          <Button onClick={this.openDelModal}>删除</Button>
          <DropdownMore menu={this.renderMore()}></DropdownMore>
        </Framework.Com.Buttons.Tool.LeftArea>

        <AdaptiveTable
          columns={this.GetColumns()}
          dataSource={tableData}
          minusHeight={279}
          pageSize={pageSize}
          current={currentPage}
          total={total}
          onPageChange={this.handlePageChange}
          onShowSizeChange={this.handleShowSizeChange}
          onSelectRows={this.handleSelectRows}
        />

        <AddModal {...addProps} />
        <DeleteModal {...delProps} />
      </div>
    )
  }

  private GetColumns = () => {
    const getHandler = (dataType: string) => {
      if (dataType === undefined) return {};
      return {
        handler: {
          onLinkClick: (row: any) => {
            this.openAddModal("编辑信息");
          }
        }
      }
    }

    return Columns.map(col => (
      {
        ...col,
        dataIndex: col.key,
        ...getHandler(col.dataType)
      })
    )
  }

  //翻页：pagesize 改变
  private handleShowSizeChange = async (current: number, size: number) => {
    const { tableData } = await this.service.getAllPositionGroup({
      currentPage: 1,
      pageSize: size,
    });
    this.setState({ pageSize: size, currentPage: 1, tableData });
  }

  //翻页：页码改变
  private handlePageChange = async (page: number, pageSize: number) => {
    const { tableData } = await this.service.getAllPositionGroup({
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
    const { checkedList } = this.state;

    if (checkedList.length <= 0) {
      UtilMessage.showMessage("请勾选要删除的内容", MessageType.error);
      return;
    }

    this.setState({ visibleDelete: true });
  }

  private handleDelete = async () => {
    // const { checkedValues } = this.state;
    this.setState({ visibleDelete: false });
  }

  private handleDelCancel = () => {
    this.setState({ visibleDelete: false });
  }

  //表格checkbox选中
  private handleSelectRows = (selectRows: any[]) => {
    // console.log(selectRows)
    this.setState({
      checkedList: selectRows.map(row => (
        {
          value: row.positionGroupId,
          name: row.positionGroupName
        })
      )
    })
  }

  private handleCheckChange = (checkedValues: any[]) => {
    this.checkedValues = checkedValues;
  }

  //导出
  private handleExport = () => {
    this.service.downloadPositionGroupExcel();
  }
}