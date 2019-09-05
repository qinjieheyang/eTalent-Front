import * as React from "react";
import { Tabs, Button, Table, Layout, Menu, Icon } from "antd";

import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

import PositionSystem from './inner/PositionSystem';
// import PositionGroup from './inner/PositionGroup';
const { TabPane } = Tabs;
const { SubMenu } = Menu;

interface IPageProps { }
export default class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {
  public state = initState;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const data = await this.service.getInit();
    this.setState(data.initData)
  }


  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1);
    if (latestOpenKey && this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  public render() {
    const { PS_columnCollection, PS_dataCollection } = this.state;
    return (
      <div className="qj-content">
        <Tabs size="large" animated={false} defaultActiveKey="1">
          <TabPane tab="职位体系" key="1">
            <PositionSystem columnCollection={PS_columnCollection} dataCollection={PS_dataCollection} />
          </TabPane>
          <TabPane tab="职位族设置" key="2">
            <div className="qj-table-outertop-btns">
              <Button type="primary">新增</Button>
              <Button>删除</Button>
              <Button>更多操作</Button>
            </div>
            <Table style={{ margin: 16 }} columns={[]} dataSource={[]} bordered pagination={false} />
          </TabPane>
          <TabPane tab="职位设置" key="3">
            <div className="qj-table-outertop-btns">
              <Button type="primary">新增</Button>
              <Button>删除</Button>
              <Button>更多操作</Button>
            </div>
            <Table style={{ margin: 16 }} columns={[]} dataSource={[]} bordered pagination={false} />
          </TabPane>
          <TabPane tab="职级设置" key="4">
            <Layout style={{ height: "calc(100vh - 64px)" }}>
              <Layout.Sider style={{ background: "#fff", borderRight: "1px solid #e8e8e8", marginTop: -16 }}>
                <Menu
                  mode="inline"
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
                  style={{ border: "none" }}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                      </span>
                    }
                  >
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                      </span>
                    }
                  >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                      <Menu.Item key="7">Option 7</Menu.Item>
                      <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    title={
                      <span>
                        <Icon type="setting" />
                        <span>Navigation Three</span>
                      </span>
                    }
                  >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Layout.Sider>
              <Layout.Content style={{ background: "#fff" }}>
                <div className="qj-table-outertop-btns">
                  <Button type="primary">新增</Button>
                  <Button>删除</Button>
                  <Button>更多操作</Button>
                </div>
                <Table style={{ margin: 16 }} columns={[]} dataSource={[]} bordered pagination={false} />
              </Layout.Content>
            </Layout>
          </TabPane>
          <TabPane tab="职等设置" key="5">
            <div className="qj-table-outertop-btns">
              <Button type="primary">新增</Button>
              <Button>删除</Button>
              <Button>更多操作</Button>
            </div>
            <Table style={{ margin: 16 }} columns={[]} dataSource={[]} bordered pagination={false} />
          </TabPane>
        </Tabs>
      </div>
    );
  }

}
