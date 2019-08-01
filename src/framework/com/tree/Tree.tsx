// import { Tree } from "antd";
// import * as React from "react";
// import { RowTable } from "src/cf/model/Index";
// // import { SearchTable } from "src/cf/model/search/SearchTable";

// const TreeNode = Tree.TreeNode;
 
// export interface INodeRow {
//     id: string;
//     name: string;
//     disabled?: boolean;
//     children?: INodeRow[];
// }

// interface IProps {
//     nodeRows: INodeRow[];
//     isCanCheck?: boolean;
 
//     searchValue?: string;
//     /** 自动展开到第n层, expandIds=undefined 时，该属性才生效 */
//     expendAutoLevel?: number;
//     onCheck?: (checkedIds: string[], CheckedRows:INodeRow[]) => void;
//     onSelect?: (selectedId: string, selectNodeRow: INodeRow ) => void;
//     switcherIcon?: React.ReactElement<any>;
// }


// interface IState {
//     checkIds: string[];
//     selectIds: string[];
//     expandIds:string[];
// }

// /** 搜索树 */
// export class SearchTree extends React.Component<IProps ,IState> {
//     public state={ checkIds:[],selectIds:[], expandIds:[]}
//     constructor(props: IProps) {
//         super(props);
//     }

//     componentWillReceiveProps(nextProps : IProps) {
//         this.setState({
//             checkIds: [],
//             selectIds: [],
//             expandIds: []
//         })
//       }

//     public render() {
//         let expandedIds = this.props.expandIds;
//         const rows = this.props.displayRows;
//         const searchValue = !this.props.searchValue ? "" : this.props.searchValue;
//         if (expandedIds == null && this.props.expendAutoLevel != null) {
//             const table = new RowTable(rows);
//             expandedIds = table.getAllIds(this.props.expendAutoLevel);
//         }

//         return (
//             <Tree
//                 onSelect={this.handleSelect}
//                 selectedKeys={ this.state.selectIds}
//                 onExpand={this.props.onExpand}
//                 expandedKeys={expandedIds}
//                 checkable={this.props.isCanCheck}
//                 checkedKeys={this.props.checkIds}
//                 onCheck={this.props.onCheck}
//                 switcherIcon ={this.props.switcherIcon}
//             >
//                 {renderTreeNodes(this.props.displayRows, searchValue)}
//             </Tree>
//         );
//     }

//     public handleSelect=(selectedKeys: string[])=>{
//         this.setState( { });
//     }
// } // class end

// const renderTreeNodes = (items: IRowBase[], searchValue: string) => {
//     if (!items) {
//         return [];
//     }

//     const nodes = [];
//     for (const item of items) {
//         const index = item.name.indexOf(searchValue);
//         const beforeStr = item.name.substr(0, index);
//         const afterStr = item.name.substr(index + searchValue.length);

//         const title =
//             index > -1 ? (
//                 <span>
//                     {beforeStr}
//                     <span style={{ color: "#f50" }}>{searchValue}</span>
//                     {afterStr}
//                 </span>
//             ) : (
//                 <span>{item.name}</span>
//             );

//         if (item.children) {
//             nodes.push(
//                 <TreeNode title={title} key={item.id} dataRef={item} disabled={item.disabled}>
//                     {renderTreeNodes(item.children, searchValue)}
//                 </TreeNode>
//             );
//         } else {
//             nodes.push(<TreeNode title={title} key={item.id} dataRef={item} disabled={item.disabled} />);
//         }
//     }
//     return nodes;
// };
