import * as React from "react";

import { Layout, Table, Switch } from "antd";

import CaseCommon from "src/caseCommon/CaseCommon";
import {Const} from "./Const";
import {Service} from "./Service";
import {IService, ServiceMock} from "./ServiceMock";
import { initState, IState } from "./State";

import DepartTree from "./inner/DepartTree"

const columns: any  = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMultiple: false,
    onFilter: (value: any, record: any)  => record.address.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];


const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    console.log(selected, selectedRows, changeRows);
  },
};


interface IPageProps {}

export default class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  private showAll: boolean = true; //显示封存

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init(){
    const treeData = await this.service.getInit();
    this.setState({treeData});
  }
  
  public render() {
    const treeData = this.state.treeData;

    return (
      <Layout>
        <Layout.Sider style={{ background: '#fff' }}>
          <div>
            <span>显示封存：</span>
            <Switch checked={this.showAll} onChange={this.onShowChange} />
          </div>
          <DepartTree treeData={treeData} showAll={this.showAll}/>
        </Layout.Sider>
        <Layout.Content>
          <Table columns={columns} dataSource={data} bordered rowSelection={rowSelection} onChange={this.onChange} />
        </Layout.Content>
      </Layout>
    );
  }

  // private renderTreeNodes = (data: any) =>
  //   data.map((item: any) => {
  //     if (item.children) {
  //       return (
  //         <TreeNode title={item.title} key={item.key} dataRef={item}>
  //           {this.renderTreeNodes(item.children)}
  //         </TreeNode>
  //       );
  //     }
  //     return <TreeNode key={item.key} {...item} />;
  //   });


  //   private onExpand = (expandedKeys: Array<string>) => {
  //   console.log('onExpand', expandedKeys);
  //   // if not set autoExpandParent to false, if children expanded, parent can not collapse.
  //   // or, you can remove all expanded children keys.
  //   this.setState({
  //     expandedKeys,
  //     autoExpandParent: false,
  //   });
  // };

  // private onCheck = (checkedKeys: Array<string>) => {
  //   console.log('onCheck', checkedKeys);
  //   this.setState({ checkedKeys });
  // };

  // private onSelect = (selectedKeys: Array<string>, info: any) => {
  //   console.log('onSelect', info);
  //   this.setState({ selectedKeys });
  // };

  private onChange = (pagination: any, filters: any, sorter: any) => {
    console.log('params', pagination, filters, sorter);
  }

  private onShowChange = (checked: boolean)=>{
    
  }
}
