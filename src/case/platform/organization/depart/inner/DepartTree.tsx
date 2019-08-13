import * as React from "react";

import {  Tree } from "antd";

const { TreeNode } = Tree;


interface IDepartTreeProps {
  showAll: boolean; //显示封存
  treeData: any
}

export default class DepartTree extends React.Component<IDepartTreeProps> {

  constructor(props: IDepartTreeProps) {
    super(props);
  }
  
  public render() {
    const treeData = this.props.treeData;
    console.log(treeData,33)
    return (
      
      <div>
        <Tree
            showLine
            // onExpand={this.onExpand}
            // expandedKeys={this.state.expandedKeys}
            // autoExpandParent={this.state.autoExpandParent}
            // onCheck={this.onCheck}
            // checkedKeys={this.state.checkedKeys}
            // onSelect={this.onSelect}
            // selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(treeData)}
        </Tree>
      </div>

    );
  }

  private renderTreeNodes = (data: any) =>{
    return data.map((item: any) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} {...item} />;
    });
  }
    
}