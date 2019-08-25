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
  columns: IColumnSortDefine[],
  selectedRowKeys: string[]
}

const Factory = new TableColumnFactory();

export class BaseTable extends React.Component<IBaseTableProps, IBaseTableState> {
  // private columns: IColumnSortDefine[];

  constructor(props: IBaseTableProps) {
    super(props);
    this.state = {columns: Factory.createColumns(this.props.columns), dataSource: this.props.dataSource, selectedRowKeys:[]};
  }

  // public initColumns(columns: IColumnSortDefine[]){
  //   const bulider = this.bulider;
  //   bulider.AddText({
  //     title: "姓名",
  //     key: "name",
  //     dataIndex: "name",
  //     dataType: "text"
  //   });
  //   bulider.AddNumber({
  //     title: "年龄",
  //     key: "age",
  //     dataIndex: "age",
  //     dataType: "number"
  //   });
  //   bulider.AddText({
  //     title: "住址",
  //     key: "address",
  //     dataIndex: "address",
  //     dataType: "text"
  //   });
  //   bulider.AddBool({
  //     title: "是否",
  //     key: "bool",
  //     dataIndex: "bool",
  //     dataType: "boolean"
  //   });
  //   bulider.AddDate({
  //     title: "日期",
  //     key: "date",
  //     dataIndex: "date",
  //     dataType: "date"
  //   });
  //   bulider.AddIdToName({
  //     title: "组织类型",
  //     key: "type",
  //     dataIndex: "type",
  //     dataType: "checkbox",
  //     searchData: [{name:"集团",id:"1"},{name:"单位",id:"2"},{name:"部门",id:"3"}]
  //   });
  //   bulider.AddTreeText({
  //     title: "机构树",
  //     key: "orgName",
  //     dataIndex: "orgName",
  //     dataType: "treeText",
  //     searchData: [
  //       {
  //         title:"集团1",
  //         value:"1",
  //         key:"1",
  //         children: [{
  //           title:"单位1",
  //           value:"1-1",
  //           key:"1-1"
  //         }]
  //       },
  //       {
  //         title:"集团2",
  //         value:"2",
  //         key:"2",
  //         children: [{
  //           title:"单位2",
  //           value:"2-1",
  //           key:"2-1"
  //         },{
  //           title:"单位3",
  //           value:"2-2",
  //           key:"2-2"
  //         }]
  //       }
  //     ]
  //   });
  //   bulider.AddButtonDelete((row:any) => {});
  //   this.columns = bulider.GetColumns();
  // }

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
