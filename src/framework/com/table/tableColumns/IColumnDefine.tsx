import { IColumnRender } from "../TableColumnBuilder";
 
export interface IColumnDefine {
    canAutoOrder: boolean;
    dataIndex: string;
    key?: string;
    render?: IColumnRender;
    title: string;
    width: number;
    filedType?: string; //text、number、Boolean、switch、tree、checkbox、operation
    /** 前缀 */
    prefixText?: string;
    /** 后缀 */
    suffixText?: string;
    checkNull?: boolean; //是否检查空值
    searchEnable?: boolean; // 字段是否可被搜索
    
}
