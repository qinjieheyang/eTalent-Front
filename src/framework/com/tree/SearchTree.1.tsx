// import { Tree } from "antd";
// import * as React from "react";
// import { RowTable } from "src/cf/model/Index";
// // import { SearchTable } from "src/cf/model/search/SearchTable";
// import { IRowBase } from "src/cf/model/struct/Struct";

// const TreeNode = Tree.TreeNode;

// // expandIds: string[];
// // selectId ?: string;
// // selectName ?: string;
// // selectRow ?: any;
// // checkIds: string[];

// export interface ISearchTreeProps {
//     displayRows: IRowBase[];
//     isCanCheck?: boolean;
//     checkIds?: string[];

//     selectId?: string;
//     expandIds?: string[];
//     searchValue?: string;
//     /** 自动展开到第n层, expandIds=undefined 时，该属性才生效 */
//     expendAutoLevel?: number;
//     onExpand?: (expandedKeys: string[]) => void;
//     onCheck?: (checkedKeys: string[], e?: any) => void;
//     onSelect?: (selectedKeys: string[], e?: any) => void;
// }

// /** 搜索树 */
// export class SearchTree extends React.Component<ISearchTreeProps> {
//     constructor(props: ISearchTreeProps) {
//         super(props);
//     }

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
//                 onSelect={this.props.onSelect}
//                 selectedKeys={this.props.selectId ? [this.props.selectId] : []}
//                 onExpand={this.props.onExpand}
//                 expandedKeys={expandedIds}
//                 checkable={this.props.isCanCheck}
//                 checkedKeys={this.props.checkIds}
//                 onCheck={this.props.onCheck}
//             >
//                 {renderTreeNodes(this.props.displayRows, searchValue)}
//             </Tree>
//         );
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
// sd