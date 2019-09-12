import * as React from "react";
import { Table } from "antd";
import { IColumnSortDefine } from "../TableColumnBuilder";
import { TableColumnFactory } from "../TableColumnFactory";

interface IBaseTableProps{
  dataSource: object[],
  columns: IColumnSortDefine[]
}

interface IBaseTableState{
  dataSource: object[],
  columns: any[],
  selectedRowKeys: string[]
}

const Factory = new TableColumnFactory();

export class BaseTable extends React.Component<IBaseTableProps, IBaseTableState> {
  // private columns: IColumnSortDefine[];

  constructor(props: IBaseTableProps) {
    super(props);
    this.state = {columns: Factory.createColumns(this.props.columns), dataSource: this.props.dataSource, selectedRowKeys:[]};
  }

  public render() {

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table 
        bordered
        dataSource={this.state.dataSource}
        columns={this.state.columns}
        rowSelection={rowSelection}
        onChange={this.handleChange} />
    )
  }

  public onSelectChange = (selectedRowKeys: string[] ) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  public handleChange = (pagination: any, filters: any, sorter: any) => {
    if(filters.__operationColumn){
      this.setState({
        columns: Factory.GetCheckedColumns()
      });
    }
  };
}
