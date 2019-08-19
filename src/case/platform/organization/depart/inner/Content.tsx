import React from "react";
import { Layout, Tabs, Button, Dropdown, Menu, Icon } from "antd";
import DepartTable from "./contentInner/DepartTable";
const { TabPane } = Tabs;

const getData = (): Array<any> => {
  const data: Array<any> = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  return data;
}

const menu = (
  <Menu>
    {
      ["封存", "解封", "合并", "划转", "排序", "模板", "导入", "导出"].map((item, index) => <Menu.Item key={index}>{item}</Menu.Item>)
    }
  </Menu>
);
interface IContentState{
  dataSource: Array<any>;
}
interface IContentProps {}
export default class Content extends React.Component<IContentProps, IContentState> {

  constructor(props: IContentProps) {
    super(props);
    this.state ={
      dataSource: getData()
    }
  }

  // componentDidMount(){
  //     this.setState({ dataSource: getData()})
  // }

  public render() {
    console.log(222)
    return (
      <Layout.Content className="qj-depart-content">
        <Tabs size="large" animated={false}>
          <TabPane key="1" className="qj-depart-tab-pane"
            tab={ <span><Icon type="table" />机构表</span> }>
            <div className="qj-depart-btns" style={{ marginBottom: 16 }}>
              <Button size="small" type="primary">新增</Button>
              <Button size="small" type="primary" ghost>删除</Button>
              <Dropdown overlay={menu}>
                <Button size="small" type="primary" ghost>更多</Button>
              </Dropdown>
            </div>
            <DepartTable dataSource={this.state.dataSource} />
          </TabPane>
          <TabPane key="2" className="qj-depart-tab-pane"
            tab={ <span><Icon type="apartment" />机构图</span> }>
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Layout.Content>
    );
  }
}
