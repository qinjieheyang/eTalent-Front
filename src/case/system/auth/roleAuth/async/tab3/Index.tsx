import * as React from "react";
import { Tree, Checkbox, Select } from "antd";
// import Framework from 'src/framework/Framework';
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";
const { TreeNode } = Tree;
const { Option } = Select;


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
          <Select placeholder="请选择需要授权的表" style={{ width: 240 }} onChange={this.handleSelectChange}>
            <Option value="1">表1</Option>
            <Option value="2">表2</Option>
            <Option value="3">表3</Option>
          </Select>
        </div>
        <div style={{ width: "100%", background: "#F8F8F8" }}>
          <span style={{ display: "inline-block", width: "calc(100% - 450px)", padding: 8, color: "#000" }}>名称</span>
          <span style={{ display: "inline-block", width: 150, padding: "8px 0", color: "#000" }}>可读</span>
          <span style={{ display: "inline-block", width: 150, padding: "8px 0", color: "#000" }}>新增可写</span>
          <span style={{ display: "inline-block", width: 150, padding: "8px 0", color: "#000" }}>可写</span>
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
      const onCheck1Change = () => {
        item.checked1 = !item.checked1;
        this.handleTreeCheckChange(item);
      }
      const onCheck2Change = () => {
        item.checked2 = !item.checked2;
        this.handleTreeCheckChange(item);
      }
      const onCheck3Change = () => {
        item.checked3 = !item.checked3;
        this.handleTreeCheckChange(item);
      }
      return (
        <div className="qj-tree-content-text">
          <span style={{ display: "inline-block" }}>{item.fieldName}</span>
          <span style={{ display: "inline-block", position: "absolute", right: 150, width: 16, height: 16 }} >
            <Checkbox onClick={onCheck1Change} checked={item.checked1} />
          </span>
          <span style={{ display: "inline-block", position: "absolute", right: 300, width: 16, height: 16 }} >
            <Checkbox onClick={onCheck2Change} checked={item.checked2} />
          </span>
          <span style={{ display: "inline-block", position: "absolute", right: 450, width: 16, height: 16 }} >
            <Checkbox onClick={onCheck3Change} checked={item.checked3} />
          </span>
        </div>
      )
    }

    return data.map((item: any) => {
      if (item.childMenuList) {
        return (
          <TreeNode title={formatTitle(item)} key={item.fieldId} dataRef={item} >
            {this.renderTreeNodes(item.childMenuList)}
          </TreeNode>
        );
      }
      return <TreeNode title={formatTitle(item)} key={item.fieldId} dataRef={item} />;
    });
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

  private handleSelectChange = (value: string) => {
    console.log(`value = ${value}`);
  }

  private handleTreeCheckChange = (item: any) => {
    // console.log(111)
  }
}