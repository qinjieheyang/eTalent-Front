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
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
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
    this.state = {columns: this.columns};
    
  }

  public initColumns(){
    const bulider = this.bulider;

    bulider.AddText("姓名","name");
    bulider.AddNumber("年龄","age");
    bulider.AddText("住址","address");
    bulider.AddButtonDelete((row:any) => {});


    this.columns = bulider.GetColumns((newColumns: any[])=>{
      this.setState({columns: newColumns});
    });
  }

  public render() {
    // return <div>历史机构</div>;
    return (
      <Card>
        <Table dataSource={dataSource} columns={this.state.columns} />;
      </Card>
    )
  }
}
