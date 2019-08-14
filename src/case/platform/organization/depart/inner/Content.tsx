import { Layout, Table, Tabs, Button, Icon, Dropdown, Menu, Pagination } from "antd";
import * as React from "react";

const { TabPane } = Tabs;

const columns: any = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">action</a>,
  },
];


const getData = (): any =>{
  const data: Array<any> = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  return data;
}

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

const getViewportOffset = ():any => {
  if(window.innerWidth){
      return{
          w:window.innerWidth,
          h:window.innerHeight
      }
  }else{
      if(document.compatMode==='BackCompat'){
          return{
              w:document.body.clientWidth,
              h:document.body.clientHeight
          }
      }else{
          return{
              w:document.documentElement.clientWidth,
              h:document.documentElement.clientHeight
          }
      }
  }
}

const computerHeight = (): number =>{
  const viewport = getViewportOffset();
  if(viewport && viewport.h && viewport.h>318){
    return viewport.h - 318;
  }
  return 0;
}


interface IContentProps {
 
}

export default class Content extends React.Component<IContentProps> {
  public state: any ={
    scroll: { 
      x: '130%',
      y: undefined
    }
  }


  constructor(props: IContentProps) {
    super(props);
    // this.state = {
    //   scroll: undefined
    // }
  }

  componentDidMount(){
    window.addEventListener("resize", this.reloadLayout)
    this.reloadLayout();

  }

  componentWillUnmount(){

    window.removeEventListener("resize", this.reloadLayout);

  }

  public render() {
    
    return (
      <Layout.Content className="qj-depart-content" style={{margin:"16px 16px 0 16px",background:"#fff"}}>
        <Tabs size="large" animated={false}>
          <TabPane tab="机构表" key="1" className="qj-depart-tab-pane">
            <div style={{marginBottom:16}}>
              <Button type="link"><Icon type="plus" />新增</Button>
              <Button type="link"><Icon type="delete" />删除</Button>
              <Dropdown overlay={menu}>
                <Button type="link"><Icon type="more" />更多</Button>
              </Dropdown>
            </div>
            <Table
              ref="departTable"
              className="qj-depart-table"
              columns={columns}
              dataSource={getData()} 
              rowSelection={rowSelection} 
              // onChange={this.onChange}
              pagination={false}
              scroll={this.state.scroll}
            />
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

  private reloadLayout = () => {
    let height:number|undefined = computerHeight();
    if(height > getData().length*54) {
      height = undefined;
    }
    this.setState({scroll:{ x:"130%",y: height }});
  }
}
