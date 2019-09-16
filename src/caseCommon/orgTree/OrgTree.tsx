import * as React from "react";
import { Switch, Tree } from "antd";
import "./index.less";

const { TreeNode } = Tree;

interface IProps {
  showAll: boolean; //显示封存
  treeData: any[];
  onShowChange: (checked: boolean) => void;
  onSelect: (selectedKeys: number[]) => void;
  selectedKeys: number[];
}

export class OrgTree extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    console.log(this.props.showAll)
    const { onShowChange, treeData } = this.props;

    return (
      <div className="qj-depart-side-box">
        <div className="qj-depart-side-title">
          <span>显示封存：</span>
          <Switch size="small" onChange={onShowChange} checked={this.props.showAll} />
        </div>
        {
          treeData.length ? <Tree
            className="qj-depart-tree"
            // onExpand={this.onExpand}
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultExpandAll
          // autoExpandParent={this.state.autoExpandParent}
          // onCheck={this.onCheck}
          // checkedKeys={this.state.checkedKeys}
          // onSelect={this.onSelect}
          // selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(this.props.treeData)}
          </Tree> : null
        }
      </div>
    );
  }

  private renderTreeNodes = (data: Array<any>) => {

    const showAll = this.props.showAll;

    return data.map((item: any) => {
      if (item.childList) {
        return (
          <TreeNode title={item.orgName} key={item.orgId} dataRef={item}>
            {this.renderTreeNodes(item.childList)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.orgName} key={item.orgId} dataRef={item} />;
    });
  }

}
