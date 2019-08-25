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
    type: "1",
    orgName: "某某集团"
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    switch: true,
    bool: false,
    date: "2019-5-30",
    type: "3",
    orgName: "莫某单位"
  },
];


export default class Page extends React.Component<any, any> {
  private bulider: any; 
  private columns: any[];

  constructor(props: any) {
    super(props);
    this.bulider = new TableColumnBuilder();
    this.initColumns();
    this.state = {columns: this.columns, dataSource: dataSource, selectedRowKeys:[]};

  }

  public initColumns(){
    const bulider = this.bulider;

    // bulider.AddText({
    //   title: "姓名",
    //   key: "name",
    //   dataIndex: "name",
    //   dataType: "text",
    //   reader: null,
    //   enableSearch:true,
    //   searchData:[],
    //   filterDropdown: null,
    //   textDisplayLength: 100,
    //   width: 100,
    //   checkNull: true,
    //   handler:{
    //     onClick:()=>{

    //     }
    //   }
      
      
    // });

    bulider.AddText({
      title: "姓名",
      key: "name",
      dataIndex: "name",
      dataType: "text"
    });
    bulider.AddNumber({
      title: "年龄",
      key: "age",
      dataIndex: "age",
      dataType: "number"
    });
    // bulider.AddSwitch("开关","switch", (value: boolean, row: any) => {
    //   console.log(value, row)
    //   row.switch = value;
    //   this.setState({dataSource: dataSource.map(item => item.key ==row.key?row:item)})
    // });
    bulider.AddText({
      title: "住址",
      key: "address",
      dataIndex: "address",
      dataType: "text"
    });
    bulider.AddBool({
      title: "是否",
      key: "bool",
      dataIndex: "bool",
      dataType: "boolean"
    });
    bulider.AddDate({
      title: "日期",
      key: "date",
      dataIndex: "date",
      dataType: "date"
    });
    bulider.AddIdToName({
      title: "组织类型",
      key: "type",
      dataIndex: "type",
      dataType: "checkbox",
      searchData: [{name:"集团",id:"1"},{name:"单位",id:"2"},{name:"部门",id:"3"}]
    });
    bulider.AddTreeText({
      title: "机构树",
      key: "orgName",
      dataIndex: "orgName",
      dataType: "treeText",
      searchData: [
        {
          title:"集团1",
          value:"1",
          key:"1",
          children: [{
            title:"单位1",
            value:"1-1",
            key:"1-1"
          }]
        },
        {
          title:"集团2",
          value:"2",
          key:"2",
          children: [{
            title:"单位2",
            value:"2-1",
            key:"2-1"
          },{
            title:"单位3",
            value:"2-2",
            key:"2-2"
          }]
        }
      ]
    });
    bulider.AddButtonDelete((row:any) => {});


    this.columns = bulider.GetColumns();

    // bulider.on
  }

  public render() {

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Card>
        <Table 
          bordered
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          rowSelection={rowSelection}
          onChange={this.handleChange} />;
      </Card>
    )
  }

  public onSelectChange = (selectedRowKeys: string[] ) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

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
    }

    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter,
    //   columns: this.bulider.GetCheckedColumns()
    // });
  };
}
