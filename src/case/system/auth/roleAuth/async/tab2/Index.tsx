import * as React from "react";
import { Tree, Checkbox } from "antd";
// import Framework from 'src/framework/Framework';
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";
const { TreeNode } = Tree;

// import { UtilMessage, MessageType } from 'src/framework/utils/Index';


interface IProps { }
export default class Group extends CaseCommon.PageAsyncBase<IProps, IState, IService> {

  public state: IState = initState;

  public expandedKeys: string[] = [];

  constructor(props: IProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {

    const treeData = await this.service.searchRoleAuthTree();

    this.setState({ treeData, isLoaded: true })

  }


  public render() {
    const { treeData, selectedKeys, isLoaded } = this.state;

    return (
      <div style={{ height: "100%", padding: 16, overflowY: "auto", overflowX: "hidden" }}>
        <div style={{ marginBottom: 8 }}>
          <Checkbox onChange={this.onCheckChange}>授权角色用户关联的下级人员</Checkbox>
          <Checkbox onChange={this.onCheckChange}>自动授权新增的子级机构</Checkbox>
        </div>
        <div style={{ width: "100%", background: "#F8F8F8" }}>
          <span style={{ display: "inline-block", width: "calc(100% - 150px)", padding: 8, color: "#000" }}>机构范围</span>
          <span style={{ display: "inline-block", width: 150, padding: "8px 0", color: "#000" }}>授权</span>
        </div>
        {
          isLoaded ? <Tree
            className="qj-tree-table"
            defaultExpandAll
            // checkable
            onSelect={this.handleSelectTreeNode}
            selectedKeys={selectedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree> : null
        }
      </div>
    )
  }

  private renderTreeNodes = (data: Array<any>) => {

    if (!data) return null;

    const formatTitle = (item: any) => {

      //使用onClick,直接绑定onChange方法，事件不触发
      const onCheckChange = () => {
        item.checked = !item.checked;
        this.handleTreeCheckChange(item);
      }
      return (
        <div className="qj-tree-content-text">
          <span style={{ display: "inline-block" }}>{item.menuName}</span>
          <span style={{ display: "inline-block", position: "absolute", right: 150, width: 16, height: 16 }} >
            <Checkbox onClick={onCheckChange} checked={item.checked} />
          </span>
        </div>
      )
    }

    return data.map((item: any) => {
      if (item.childMenuList) {
        return (
          <TreeNode title={formatTitle(item)} key={item.menuId} dataRef={item} >
            {this.renderTreeNodes(item.childMenuList)}
          </TreeNode>
        );
      }
      return <TreeNode title={formatTitle(item)} key={item.menuId} dataRef={item} />;
    });
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

  private onCheckChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  }

  private handleTreeCheckChange = (item: any) => {
    // console.log(111)
  }
}