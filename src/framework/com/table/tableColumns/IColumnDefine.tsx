// import { IColumnRender } from "../TableColumnBuilder";
 
// interface ITreeData {
//     title: string;
//     key: string;
//     value: string|boolean|number;
// }
  
// interface IColumnExtAttrs {
//     treeData: ITreeData[]
// }
  

export interface IColumnDefine {
    title: string;
    key: string;
    dataIndex: string;
    dataType?: string; //text、number、Boolean、switch、tree、checkbox、operation 默认text
    render?: (cellValue: any, row: object, index: number) => React.ReactElement<any>;
    width?: number;
    canAutoOrder?: boolean;
    /** 前缀 */
    prefixText?: string;
    /** 后缀 */
    suffixText?: string;
    textDisplayLength?: number;
    checkNull?: boolean; //是否检查空值
    enableSearch?: boolean; // 字段是否可被搜索
    searchData?: any[];
    handler?: object;
}
