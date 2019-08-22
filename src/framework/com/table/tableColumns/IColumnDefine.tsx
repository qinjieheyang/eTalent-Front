import { IColumnRender } from "../TableColumnBuilder";
 
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
    searchEnable?: boolean; // 字段是否可被搜索
    
}


// export interface IColumnDefine {
//     title: string;
//     dataIndex: string;
//     key?: string; //没有使用dataIndex
//     width: number;
//     render?: IColumnRender;
//     filedType?: string; //text、number、Boolean、switch、tree、checkbox、operation
//     sortOrder: boolean; //是否排序


//     canAutoOrder: boolean;
//     /** 前缀 */
//     prefixText?: string;
//     /** 后缀 */
//     suffixText?: string;
//     checkNull?: boolean; //是否检查空值
//     searchEnable?: boolean; // 字段是否可被搜索
    
// }

// export interface ColumnProps<T> {
//     title?:
//       | React.ReactNode
//       | ((options: { filters: TableStateFilters; sortOrder?: SortOrder }) => React.ReactNode);
//     key?: React.Key;
//     dataIndex?: string; // Note: We can not use generic type here, since we need to support nested key, see #9393
//     render?: (text: any, record: T, index: number) => React.ReactNode;
//     align?: 'left' | 'right' | 'center';
//     filters?: ColumnFilterItem[];
//     onFilter?: (value: any, record: T) => boolean;
//     filterMultiple?: boolean;
//     filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
//     filterDropdownVisible?: boolean;
//     onFilterDropdownVisibleChange?: (visible: boolean) => void;
//     sorter?: boolean | CompareFn<T>;
//     defaultSortOrder?: SortOrder;
//     colSpan?: number;
//     width?: string | number;
//     className?: string;
//     fixed?: boolean | ('left' | 'right');
//     filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
//     filteredValue?: any[];
//     sortOrder?: SortOrder | boolean;
//     children?: ColumnProps<T>[];
//     onCellClick?: (record: T, event: Event) => void;
//     onCell?: (record: T, rowIndex: number) => TableEventListeners;
//     onHeaderCell?: (props: ColumnProps<T>) => TableEventListeners;
//     sortDirections?: SortOrder[];
//   }