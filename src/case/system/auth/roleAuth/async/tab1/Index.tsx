import * as React from "react";
import { Tree } from "antd";
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

  public checkedValues: any[];

  constructor(props: IProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {

    const treeData = await this.service.searchRoleAuthTree();

    this.setState({ treeData })

    console.log(treeData,111)
  }


  public render() {
    const { treeData, selectedKeys } = this.state;

    return (
      <div style={{ height: "100%", padding: 16 }}>
        <Tree
          defaultExpandAll
          checkable
          showLine 
          onSelect={this.handleSelectTreeNode}
          selectedKeys={selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    )
  }

  private renderTreeNodes = (data: Array<any>) => {

    return data.map((item: any) => {
      if (item.childMenuList) {
        return (
          <TreeNode title={item.menuName} key={item.menuId} dataRef={item} >
            {this.renderTreeNodes(item.childMenuList)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.menuName} key={item.menuId} dataRef={item} />;
    });
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

}