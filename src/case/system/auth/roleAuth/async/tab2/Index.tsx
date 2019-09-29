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
        <Checkbox onChange={this.onCheckChange}>授权角色用户关联的下级人员</Checkbox>
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
    const onCheckChange = ((e: any) => {
      console.log(222)
    })
    const formatTitle = (name: string) => {
      return (
        <div className="qj-tree-content-text">
          <span style={{ display: "inline-block" }}>{name}</span>
          <span style={{ display: "inline-block", position: "absolute", right: 10 }}>
            <Checkbox onChange={onCheckChange} />
          </span>
        </div>
      )
    }

    return data.map((item: any) => {
      if (item.childMenuList) {
        return (
          <TreeNode title={formatTitle(item.menuName)} key={item.menuId} dataRef={item} >
            {this.renderTreeNodes(item.childMenuList)}
          </TreeNode>
        );
      }
      return <TreeNode title={formatTitle(item.menuName)} key={item.menuId} dataRef={item} />;
    });
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

  private onCheckChange = (e: any) => {
    // console.log(1111)
    console.log(`checked = ${e.target.checked}`);
  }
}