import * as React from "react";
import { Card, Table } from "antd";
import Framework from "src/framework/Framework";


const TableColumnBuilder = Framework.Com.Tables.TableColumnBuilder;


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    switch: false,
    bool: true,
    date: "2019-10-30",
    type: "1"
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    switch: true,
    bool: false,
    date: "2019-5-30",
    type: "3"
  },
];


export default class Page extends React.Component<any, any> {
  private bulider: any; 
  private columns: any[];
  // const CreateColumn = (): any[] => {
  //   bulider.AddText("姓名","name");
  //   bulider.AddNumber("年龄","age");
  //   bulider.AddText("住址","address");
  //   bulider.AddButtonDelete(function(row){
  //   });
  
  //   return bulider.GetColumns();
  // }

  constructor(props: any) {
    super(props);
    this.bulider = new TableColumnBuilder();
    this.initColumns();
    this.state = {columns: this.columns, dataSource: dataSource};

  }

  public initColumns(){
    const bulider = this.bulider;

    bulider.AddText("姓名","name");
    bulider.AddNumber("年龄","age");
    bulider.AddSwitch("开关","switch", (value: boolean, row: any) => {
      console.log(value, row)
      row.switch = value;
      this.setState({dataSource: dataSource.map(item => item.key ==row.key?row:item)})
    });
    bulider.AddText("住址","address");
    bulider.AddBool("是否","bool");
    bulider.AddDate("日期","date");
    bulider.AddIdToName("组织类型","type",[{name:"集团",id:"1"},{name:"单位",id:"2"},{name:"部门",id:"3"}]);
    bulider.AddButtonDelete((row:any) => {});


    this.columns = bulider.GetColumns();

    // bulider.on
  }

  public render() {
    return (
      <Card>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} onChange={this.handleChange} />;
      </Card>
    )
  }

  // private oldFilters:any;

  public handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    // this.oldFilters = filters;
    // const newColumns: any[] = [];
    // if(filters.__operationColumn){
    //   for(const c of this.columns){
    //     if(filters.__operationColumn.includes(c.dataIndex) || c.dataIndex === "__operationColumn"){
    //       newColumns.push(c);
    //     }
    //   }
    // }
    // console.log(filters.__operationColumn)
    if(filters.__operationColumn){
      this.setState({
        columns: this.bulider.GetCheckedColumns()
      });
      // delete filters.__operationColumn;
    }

    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter,
    //   columns: this.bulider.GetCheckedColumns()
    // });
  };
}
