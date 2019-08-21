import { IColumnRender, IFilterDropdown } from "../TableColumnBuilder";
 
export interface IColumnDefine {
    canAutoOrder: boolean;
    dataIndex: string;
    key: string;
    render?: IColumnRender;
    title: string;
    width: number;
    /** 前缀 */
    prefixText?: string;
    /** 后缀 */
    suffixText?: string;
    filterDropdown?:  IFilterDropdown;
}
