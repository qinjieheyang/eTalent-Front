import * as React from "react";
import { Layout, Tabs, Button, Menu, Icon } from "antd";

import Framework from "src/framework/Framework";
import DepartTableColumns from './contentInner/DepartTableColumns';
import AddModal from "./contentInner/AddModal";
import DeleteModal from "./contentInner/DeleteModal";
import SealModal from "./contentInner/SealModal";
import UnSealModal from "./contentInner/UnSealModal";
import MergeModal from "./contentInner/MergeModal";
import ImportModal from './contentInner/ImportModal';
import OrgFlow from './contentInner/OrgFlow';

const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

const { DropdownMore } = Framework.Com.Dropdowns;
const { TabPane } = Tabs;




interface IContentState {
  visibleAdd: boolean;
  visibleDelete: boolean;
  visibleSeal: boolean; //封存
  visibleUnSeal: boolean; //解封
  visibleMerge: boolean;
  visibleImport: boolean;
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
      visibleDelete: false,
      visibleSeal: false,
      visibleUnSeal: false,
      visibleMerge: false,
      visibleImport: false,
      confirmLoading: false,
    }
  }

  public render() {
    const { visibleAdd, visibleDelete, visibleSeal, visibleUnSeal, visibleMerge, confirmLoading, visibleImport} = this.state;

    const menu = (
        <Menu style={{textAlign:"center"}}>
          <Menu.Item onClick={this.openSealModal}>封存</Menu.Item>
          <Menu.Item onClick={this.openUnSealModal}>解封</Menu.Item>
          <Menu.Item onClick={this.openMergeModal}>合并</Menu.Item>
          <Menu.Item onClick={this.openMergeModal}>划转</Menu.Item>
          <Menu.Item>排序</Menu.Item>
          <Menu.Item onClick={this.openImportModal}>导入</Menu.Item>
          <Menu.Item 
          onClick={ 
            () => Framework.Utils.UtilDownload.Img({
               url:"https://qinjee-datacenter-1253673776.cos.ap-guangzhou.myqcloud.com/user/logo.png",
            })
          }>导出</Menu.Item>
        </Menu>
    );

    return (
      <Layout.Content className="qj-depart-content">
        <Tabs size="large" animated={false} defaultActiveKey={"2"}>
          <TabPane key="1" className="qj-depart-tab-pane"
            tab={<span><Icon type="table" />机构表</span>}>
            <div className="qj-depart-btns">
              <Button type="primary" onClick={this.openAddModal}>新增</Button>
              <Button onClick={this.openDelModal}>删除</Button>
              <DropdownMore menu = {menu}></DropdownMore>
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
            <div style={{ padding: '0 24px', height: "100%" }}>
              <OrgFlow />
            </div>
          </TabPane>
        </Tabs>
        <AddModal 
          visible={visibleAdd} 
          confirmLoading={confirmLoading}
          onOk={this.handleAdd}
          onCancel={this.handleAddCancel}
        />
        <DeleteModal
          visible={visibleDelete} 
          confirmLoading={confirmLoading}
          onOk={this.handleDelete}
          onCancel={this.handleDelCancel}
        />
        <SealModal
          visible={visibleSeal} 
          confirmLoading={confirmLoading}
          onOk={this.handleSeal}
          onCancel={this.handleSealCancel}
        />
        <UnSealModal
          visible={visibleUnSeal} 
          confirmLoading={confirmLoading}
          onOk={this.handleUnSeal}
          onCancel={this.handleUnSealCancel}
        />
        <MergeModal
          visible={visibleMerge} 
          confirmLoading={confirmLoading}
          onOk={this.handleMerge}
          onCancel={this.handleMergeCancel}
        />
        <ImportModal
          visible={visibleImport} 
          confirmLoading={confirmLoading}
          onOk={this.handleImport}
          onCancel={this.handleImportCancel}
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

  private openDelModal = () => {
    this.setState({ visibleDelete: true });
  }

  private handleDelete = () => {
    this.setState({ visibleDelete: false });
  }

  private handleDelCancel = () => {
    this.setState({ visibleDelete: false });
  }

  private openSealModal = () => {
    this.setState({ visibleSeal: true });
  }

  private handleSeal = () => {
    this.setState({ visibleSeal: false });
  }

  private handleSealCancel = () => {
    this.setState({ visibleSeal: false });
  }

  private openUnSealModal = () => {
    this.setState({ visibleUnSeal: true });
  }

  private handleUnSeal = () => {
    this.setState({ visibleUnSeal: false });
  }

  private handleUnSealCancel = () => {
    this.setState({ visibleUnSeal: false });
  }

  private openMergeModal = () => {
    this.setState({ visibleMerge: true });
  }

  private handleMerge = () => {
    this.setState({ visibleMerge: false });
  }

  private handleMergeCancel = () => {
    this.setState({ visibleMerge: false });
  }

  private openImportModal = () => {
    this.setState({ visibleImport: true });
  }

  private handleImport = () => {
    this.setState({ visibleImport: false });
  }

  private handleImportCancel = () => {
    this.setState({ visibleImport: false });
  }
}
