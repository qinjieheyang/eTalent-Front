import * as React from "react";
import { Switch, Tree } from "antd";
import "./index.less";

const { TreeNode } = Tree;

interface IProps {
  showAll: boolean; //显示封存
  treeData: any[];
  onShowChange: (checked: boolean) => void;
  onSelect: (selectedKeys: string[]) => void;
  selectedKeys: string[];
}

export class OrgTree extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  public render() {
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

    const showAll = this.props.showAll;

    return data.map((item: any) => {
      const style = {
        display: (item.isEnable || showAll) ? "block" : "none"
      }

      const className = item.isEnable ? undefined : "qj-tree-node-hidden"

      if (item.childList) {
        return (
          <TreeNode className={className} title={item.orgName} key={item.orgId} dataRef={item} style={style}>
            {this.renderTreeNodes(item.childList)}
          </TreeNode>
        );
      }
      return <TreeNode className={className} title={item.orgName} key={item.orgId} dataRef={item} style={style} />;
    });
  }

}
