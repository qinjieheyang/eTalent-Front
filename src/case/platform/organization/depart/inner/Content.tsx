import React from "react";
import { Layout, Tabs, Button, Dropdown, Menu, Icon } from "antd";

import Framework from "src/framework/Framework";
import DepartTableColumns from './contentInner/DepartTableColumns';
import AddModal from "./contentInner/AddModal";

const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

const { TabPane } = Tabs;

const menu = (
  <Menu>
    {
      ["封存", "解封", "合并", "划转", "排序", "模板", "导入", "导出"].map((item, index) => <Menu.Item key={index}>{item}</Menu.Item>)
    }
  </Menu>
);

interface IContentState {
  visibleAdd: boolean;
  confirmLoading: boolean;

}
interface IContentProps {
  dataSource: Array<any>;
}
export default class Content extends React.Component<IContentProps, IContentState> {
  public state: IContentState;

  constructor(props: IContentProps) {
    super(props);
    this.state = {
      visibleAdd: false,
      confirmLoading: false
    }
  }

  public render() {
    const { visibleAdd, confirmLoading} = this.state;
    return (
      <Layout.Content className="qj-depart-content">
        <Tabs size="large" animated={false}>
          <TabPane key="1" className="qj-depart-tab-pane"
            tab={<span><Icon type="table" />机构表</span>}>
            <div className="qj-depart-btns">
              <Button type="primary" onClick={this.openAddModal}>新增</Button>
              <Button >删除</Button>
              <Dropdown overlay={menu}>
                <Button>更多</Button>
              </Dropdown>
            </div>
            <div style={{ padding: '0 24px' }}>
              <AdaptiveTable
                columns={DepartTableColumns}
                dataSource={this.props.dataSource}
                minusHeight={264}
              />
            </div>
          </TabPane>
          <TabPane key="2" className="qj-depart-tab-pane"
            tab={<span><Icon type="apartment" />机构图</span>}>
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
        <AddModal 
          visible={visibleAdd} 
          confirmLoading={confirmLoading}
          onOk={this.handleAdd}
          onCancel={this.handleAddCancel}
        />
      </Layout.Content>
    );
  }

  private openAddModal = () => {
    this.setState({ visibleAdd: true });
  }

  private handleAdd = () => {
    this.setState({ visibleAdd: false });
  }

  private handleAddCancel = () => {
    this.setState({ visibleAdd: false });
  }
}
