import { IColumnRender } from "../TableColumnBuilder";
 
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
    dataIndex: string;
    key: string;
    render?: IColumnRender;
    width: number;
    filedType?: string; //text、number、Boolean、switch、tree、checkbox、operation
    canAutoOrder: boolean;
    /** 前缀 */
    prefixText?: string;
    /** 后缀 */
    suffixText?: string;
    checkNull?: boolean; //是否检查空值
    serachEnable?: boolean; // 字段是否可被搜索
    attrs?: object
}