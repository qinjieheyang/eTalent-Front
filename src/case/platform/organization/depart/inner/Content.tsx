import { Layout, Table, Tabs, Button, Icon, Dropdown, Menu, Pagination } from "antd";
import * as React from "react";

const { TabPane } = Tabs;

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

const menu = (
  <Menu>
    {
      ["封存","解封","合并","划转","排序","模板","导入","导出"].map((item, index) => <Menu.Item key={index}>{item}</Menu.Item>)
    }
  </Menu>
);

interface IContentProps {
 
}

// interface IContentState {
//   scroll: any | undefined
// }

export default class Content extends React.Component<IContentProps> {
  public state: any ={
    scroll: undefined
  }

  constructor(props: IContentProps) {
    super(props);
    // this.state = {
    //   scroll: undefined
    // }
  }

  componentDidMount(){
    // console.log(this.refs['departTable'])
    // console.log(this.refs["departTableWrapper"], 4444)
    // React.ReactInstance
    // const {clientWidth, clientHeight} = this.refs["departTableWrapper"];

    this.reloadLayout(this.refs["departTableWrapper"]);

  }

  public render() {

    return (
      <Layout.Content ref="departContent" className="qj-depart-content" style={{margin:"16px 16px 0 16px",background:"#fff"}}>
        <Tabs size="large" animated={false}>
          <TabPane tab="机构表" key="1" className="qj-depart-tab-pane">
            <div style={{marginBottom:16}}>
              <Button type="link"><Icon type="plus" />新增</Button>
              <Button type="link"><Icon type="delete" />删除</Button>
              <Dropdown overlay={menu}>
                <Button type="link"><Icon type="more" />更多</Button>
              </Dropdown>
            </div>
            <div ref="departTableWrapper" className="qj-depart-table-wrapper">
              <Table
                ref="departTable"
                className="qj-depart-table"
                columns={columns}
                dataSource={data} 
                rowSelection={rowSelection} 
                onChange={this.onChange}
                pagination={false}
                scroll={this.state.scroll}
              />
            </div>
            <Pagination 
              showQuickJumper 
              showSizeChanger 
              defaultCurrent={1} 
              total={500} 
              style={{
                paddingRight:16
              }}
              showTotal={
                (total, range) => `显示${range[0]}-${range[1]}，每页显示 ${total} 条`
              }
            />
          </TabPane>
          <TabPane tab="机构图" key="2" className="qj-depart-tab-pane">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Layout.Content>
    );
  }

  private onChange = (pagination: any, filters: any, sorter: any) => {
    console.log('params', pagination, filters, sorter);
  }

  private reloadLayout = (dom: any|undefined) => {
    if(dom){
      // this.setState({scroll:{y: dom.clientHeight-64}});
    }
  }
}
