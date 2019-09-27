import * as React from "react";
import { Tree } from "antd";
import "./index.less";

const { TreeNode } = Tree;

interface IProps {
  treeData: any[];
  onShowChange: (checked: boolean) => void;
  onSelect: (selectedKeys: string[]) => void;
  selectedKeys: string[];
}

export class RoleTree extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { treeData } = this.props;

    return (
      <div className="qj-role-box">
        <div className="qj-role-title">
          <span>角色管理</span>
        </div>
        <div className="qj-role-btns">
          {this.props.children}
        </div>
        {
          treeData.length ? <Tree
            className="qj-role-tree"
            defaultExpandAll
            onSelect={this.props.onSelect}
            selectedKeys={this.props.selectedKeys}
          >
            {this.renderTreeNodes(this.props.treeData)}
          </Tree> : null
        }
      </div>
    );
  }

  private renderTreeNodes = (data: Array<any>) => {

    return data.map((item: any) => {
      if (item.childRoleGroupList) {
        return (
          <TreeNode title={item.roleGroupName} key={item.roleGroupId} dataRef={item} >
            {this.renderTreeNodes(item.childRoleGroupList)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.roleGroupName} key={item.roleGroupId} dataRef={item} />;
    });
  }

}
