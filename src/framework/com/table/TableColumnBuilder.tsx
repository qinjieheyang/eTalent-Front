import { Divider, Popconfirm, Switch, Checkbox, Icon } from "antd";
import * as React from "react";

import { DataTable } from "../../data/dataTable/DataTable";
import { UtilNumber } from "../../utils/UtilNumber";
import { UtilLog } from "../../utils/UtilLog";
import { IColumnDefine } from "./tableColumns/IColumnDefine";
import { IOptGroup, OptGroup } from "./tableColumns/OptGroup";
import { ColumnSearch } from "./tableColumns/ColumnSearch";

export type IColumnRender = (cellValue: any, row: object, index: number) => React.ReactElement<any>;

export type IOptColumnRender = (row: any) => React.ReactNode;

const formatTitle = (title: string, width?: number, enableSearch?: boolean, canAutoOrder?: boolean) => {
    let subtractWidth = 0;
    if (enableSearch) {
        subtractWidth += 46;
    }
    if (canAutoOrder) {
        subtractWidth += 20;
    }

    if (width && width > subtractWidth) {
        return <span title={title} className="qj-table-td-txt" style={{ width: width - subtractWidth }}>{title}</span>
    }
    return <span title={title} className="qj-table-td-txt">{title}</span>
}

const formatTextWidth = (width?: number, enableSearch?: boolean) => {
    if (!enableSearch) return { width };

    if (width && width > 32) {
        return {
            width: width - 32
        }
    }
    return {};
}

interface FilterDropdownProps {
    setSelectedKeys: (target: string[]) => void;
    selectedKeys: string[];
    confirm: () => void;
    clearFilters: () => void;
}

export interface IColumnSortDefine extends IColumnDefine {
    sorter?: any;
    filterDropdown?: (props: FilterDropdownProps) => React.ReactElement<any>;
    filterIcon?: (filtered: string | undefined) => React.ReactNode;
    onFilterDropdownVisibleChange?: (visible: boolean) => void;
    filterDropdownVisible?: boolean;
    title: any;
    onCell?: (record: any, rowIndex: number) => any;
    onHeaderCell?: (column: any) => any;
}

export class TableColumnBuilder {
    private optGroups: OptGroup[] = [];
    public set OptColumnWidth(width: number) {
        this.optColumnWidth = width;
    }

    private columnDefines: IColumnSortDefine[] = [];
    private optColumnRenders: IOptColumnRender[] = [];
    private optColumnWidth: number = 100;

    private checkedColumnDefines: IColumnSortDefine[] = [];

    private mapSelectTable = new Map<string, DataTable>();

    constructor() {
        this.columnDefines = [];
        this.checkedColumnDefines = [];
        this.optColumnRenders = [];
    }

    public GetColumns = () => {
        const columns: IColumnSortDefine[] = [];
        for (const c of this.columnDefines) {
            columns.push(c);
            if (c.canAutoOrder) {
                // c.sorter = (row1: object, row2: object) => rowSorter(row1, row2, c.dataIndex);
                c.sorter = true;
            }
            c.enableSearch === undefined ? c.enableSearch = true : c.enableSearch = false;
            if (c.enableSearch) {
                c.filterIcon = (filtered: string | undefined) => (
                    <Icon type="down-circle" style={{ color: filtered ? '#bfbfbf' : undefined }} />
                )
            }
        }
        if (this.optColumnRenders.length === 0) {
            return columns;
        }

        columns.push(this.AddOperation());
        this.checkedColumnDefines = columns;
        return columns;
    };

    public GetCheckedColumns = () => {
        return this.checkedColumnDefines;
    }

    private SetCheckedColumns = (checkedColumnValues: string[]) => {
        const newColumns: IColumnSortDefine[] = [];
        for (const c of this.columnDefines) {
            if (checkedColumnValues.includes(c.dataIndex) || c.dataIndex === "__operationColumn") {
                newColumns.push(c);
                if (c.canAutoOrder) {
                    c.sorter = true;
                }
                c.enableSearch === undefined ? c.enableSearch = true : c.enableSearch = false;
                if (c.enableSearch) {
                    c.filterIcon = (filtered: string | undefined) => (
                        <Icon type="down-circle" style={{ color: filtered ? '#bfbfbf' : undefined }} />
                    )
                }
            }
        }
        if (this.optColumnRenders.length) {
            newColumns.push(this.AddOperation());
        }

        this.checkedColumnDefines = newColumns;
    }



    // -----------------------------------------------------------------------------------------------------------------

    /** 私有化操作列，有操作时自动加入到columns */
    private AddOperation = (): IColumnDefine => {

        const columns: IColumnSortDefine[] = this.columnDefines;

        const col: IColumnSortDefine = {
            canAutoOrder: false,
            title: "操作",
            key: "__operationColumn",
            dataIndex: "__operationColumn",
            dataType: "__operation",
            width: this.optColumnWidth,
            render: (cellValue: any, row: any, index: number): React.ReactElement<any> => {
                return (
                    <span>
                        {this.optColumnRenders.map((createButtonFunc, i, array) => {
                            if (i < array.length - 1) {
                                return (
                                    <span key={i}>
                                        {createButtonFunc(row)} <Divider type="vertical" />
                                    </span>
                                );
                            }

                            return <span key={i}> {createButtonFunc(row)}</span>;
                        })}
                        {this.optGroups.map((optGroup, i, array) => {
                            return optGroup.onRender(row);
                        })}
                    </span>
                );
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps): React.ReactElement<any> => {
                const filterColumns: IColumnSortDefine[] = columns; //去除操作项
                const defaultValues: string[] = [];
                const plainOptions: any[] = filterColumns.map((column: any, index: number) => {
                    defaultValues.push(column.key);
                    return { label: column.title, value: column.key }
                });

                return (
                    <React.Fragment>
                        <span className="qj-filter-dropdown-arrow"></span>
                        <div className="custom-filter-dropdown" onMouseLeave={() => { confirm() }} >
                            <Checkbox.Group
                                className="qj-table-filter-column"
                                options={plainOptions}
                                defaultValue={defaultValues}
                                onChange={(checkedValues: string[]) => {
                                    col.filterDropdownVisible = true;
                                    setSelectedKeys(checkedValues);
                                    confirm();
                                    this.SetCheckedColumns(checkedValues);
                                }}
                            />
                        </div>
                    </React.Fragment>
                )
            },
            filterIcon: (filtered: string | undefined) => (
                <Icon type="setting" style={{ color: filtered ? '#bfbfbf' : undefined }} />
            )
        };
        return col;
    }

    /** 排序号 */
    public AddSortNum = ({
        title = "序号",
        key = "__SortNum",
        dataIndex = "__SortNum",
        dataType = "__SortNum",
        width = 50
    }: IColumnDefine): IColumnDefine => {
        const col: IColumnSortDefine = {
            title,
            key,
            dataIndex,
            dataType,
            render: (cellValue: any, row: object, index: number): any => {
                const indexLabel = index + 1;
                return <span className="qj-table-td-txt" style={{ width: width - 32 }}>{indexLabel}</span>;
            },
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddText = ({
        title,
        key,
        dataIndex,
        dataType,
        width,
        enableSearch = false,
        checkNull = false,
        canAutoOrder = true,
        fixed = false,
        handler
    }: IColumnDefine): IColumnSortDefine => {

        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            fixed,
            render: (cellValue: any, row: object, index: number): any => {
                if (cellValue == null) {
                    return "";
                }

                if (typeof cellValue !== "string") {
                    //强制转化为字符串
                    UtilLog.warn("文本列包含非文本值", { dataIndex, cellValue });
                    cellValue = String(cellValue);
                    // throw new Error("列非文本类型, 在：" + dataIndex + "=" + cellValue);
                }

                const text = col.prefixText ? col.prefixText + cellValue : cellValue;

                return <span title={cellValue} className="qj-table-td-txt" style={formatTextWidth(width, enableSearch)}>{text}</span>
            },
            ...ColumnSearch.getTextSearchProps({ key, title, enableSearch, checkNull, handler }),

        };
        this.columnDefines.push(col);
        return col;
    };

    public AddLinkText = ({
        title,
        key,
        dataIndex,
        dataType,
        width,
        enableSearch = false,
        checkNull = false,
        canAutoOrder = true,
        fixed = false,
        handler
    }: IColumnDefine): IColumnSortDefine => {

        const handleLinkClick = (row: any) => {
            if (handler && handler["onLinkClick"]) {
                handler["onLinkClick"](row);
            }
        }

        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            fixed,
            render: (cellValue: any, row: object, index: number): any => {
                if (cellValue == null) {
                    return "";
                }

                if (typeof cellValue !== "string") {
                    //强制转化为字符串
                    UtilLog.warn("文本列包含非文本值", { dataIndex, cellValue });
                    cellValue = String(cellValue);
                    // throw new Error("列非文本类型, 在：" + dataIndex + "=" + cellValue);
                }

                const text = col.prefixText ? col.prefixText + cellValue : cellValue;

                return <a href="javascript:;" title={cellValue} className="qj-table-td-txt" style={formatTextWidth(width, enableSearch)} onClick={() => { handleLinkClick(row) }}>{text}</a>
            },
            ...ColumnSearch.getTextSearchProps({ key, title, enableSearch, checkNull, handler })
        };
        this.columnDefines.push(col);
        return col;
    };

    /** 默认开启树选择 */
    public AddTreeText = ({
        title,
        key,
        dataIndex,
        dataType,
        width = 100,
        enableSearch = true,
        canAutoOrder = true,
        searchData = []
    }: IColumnDefine): IColumnSortDefine => {

        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            render: (cellValue: any, row: object, index: number): any => {
                if (cellValue == null) {
                    return "";
                }

                if (typeof cellValue !== "string") {
                    UtilLog.warn("文本列不能包含文本值", { dataIndex, cellValue });
                    // throw new Error("列非文本类型, 在：" + dataIndex + "=" + cellValue);
                    cellValue = String(cellValue);
                }

                const text = col.prefixText ? col.prefixText + cellValue : cellValue;
                return <span title={cellValue} className="qj-table-td-txt" style={{ width: width - 32 }}>{text}</span>
            },
            ...ColumnSearch.getTreeSearchProps({ key, title, enableSearch, searchData })
        };

        this.columnDefines.push(col);
        return col;
    };

    public AddBool = ({
        title,
        key,
        dataIndex,
        dataType,
        width = 100,
        enableSearch = true,
        canAutoOrder = true,
        // prefixText,
        searchData = ["是", "否"]
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            render: (cellValue: any, row: object, index: number): any => {
                const val = row[dataIndex];
                if (val === "" || val == null) {
                    return "";
                }
                if (val === true || val === 1) {
                    return <span className="qj-boolean-text"><span className="qj-boolean-prefix qj-boolean-prefix-true"></span>{searchData[0] || "是"}</span>;
                }
                if (val === false || val === 0) {
                    return <span className="qj-boolean-text"><span className="qj-boolean-prefix qj-boolean-prefix-false"></span>{searchData[1] || "否"}</span>;
                }

                return ":" + val;
            },
            ...ColumnSearch.getBoolSearchProps({ key, title, enableSearch, searchData })
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddNumber = ({
        title,
        key,
        dataIndex,
        dataType,
        width = 50,
        enableSearch = true,
        canAutoOrder = true,
        searchData = [0, 100]
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            ...ColumnSearch.getNumberSearchProps({ key, title, enableSearch, searchData })
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddMoney = ({
        title,
        key,
        dataIndex,
        dataType,
        enableSearch = true,
        canAutoOrder = true,
        width = 50
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            render: (cellValue: any, row: object, index: number) => {
                return UtilNumber.numberToRMB(cellValue, "￥") as any;
            }
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddCustomRender = ({
        title,
        key,
        dataIndex,
        dataType,
        enableSearch = true,
        canAutoOrder = true,
        width = 50
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    /** 年-月-日 时：分 */
    public AddDateYYYYMMDDHHmm = ({
        title,
        key,
        dataIndex,
        dataType,
        enableSearch = true,
        canAutoOrder = true,
        width = 100
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            render: (cellValue: any, row: object, index: number): any => {
                if (!cellValue || cellValue === "") {
                    return "";
                }
                const date2 = new Date(cellValue);
                const localeString = `${date2.getFullYear()}-${date2.getMonth() +
                    1}-${date2.getDate()} ${date2.getHours()}:${date2.getMinutes()}`;
                return localeString;
            }
        };
        this.columnDefines.push(col);
        return col;
    };

    /** 年-月-日 */
    public AddDate = ({
        title,
        key,
        dataIndex,
        dataType,
        enableSearch = true,
        canAutoOrder = true,
        width = 100
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            render: (cellValue: any, row: object, index: number): any => {
                if (!cellValue || cellValue === "") {
                    return "";
                }
                const date2 = new Date(cellValue);
                const localeString = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`;
                return localeString;
            },
            ...ColumnSearch.getDateSearchProps({ key, title, enableSearch })
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddYearMonth = ({
        title,
        key,
        dataIndex,
        dataType,
        enableSearch = true,
        canAutoOrder = true,
        width = 100
    }: IColumnDefine): IColumnSortDefine => {
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            render: (cellValue: any, row: object, index: number): any => {
                const date2 = new Date(cellValue);
                const localeString = `${date2.getFullYear()}年${date2.getMonth() + 1}月`;
                return localeString;
            }
        };

        this.columnDefines.push(col);
        return col;
    };

    /** ID到名称的转换 ,性能低下以后优化 */
    public AddIdToName = ({
        title,
        key,
        dataIndex,
        dataType,
        width = 100,
        enableSearch = true,
        canAutoOrder = true,
        searchData = []
    }: IColumnDefine): IColumnSortDefine => {
        const selectTable = new DataTable(searchData);
        this.mapSelectTable.set(dataIndex, selectTable);
        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            canAutoOrder,
            render: (cellValue: any, row: object, index: number): any => {
                const table = this.mapSelectTable.get(dataIndex);
                if (!table) {
                    return cellValue;
                }
                const isExist = table.isExist(cellValue);
                if (isExist === false) {
                    return cellValue;
                }
                const codeRow: any = table.getById(cellValue);
                return codeRow.name;
            },
            ...ColumnSearch.getCheckboxSearchProps({ key, title, enableSearch, searchData })
        };

        this.columnDefines.push(col);
        return col;
    };



    /** TODO:ID到名称的转换 ,性能低下以后优化 */
    public AddIdArrayToName = ({
        title,
        key,
        dataIndex,
        dataType,
        width = 100,
        enableSearch = true,
        canAutoOrder = true,
        searchData = [],
        textDisplayLength = 30
    }: IColumnDefine): IColumnSortDefine => {
        const selectTable = new DataTable(searchData);
        this.mapSelectTable.set(dataIndex, selectTable);

        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            render: (cellValue: any, row: object, index: number): any => {
                if (cellValue) {
                    if (cellValue.constructor !== Array) {
                        throw new Error(dataIndex + " | 字段值非string数组");
                    }
                }
                const table = this.mapSelectTable.get(dataIndex);
                if (!table) {
                    return cellValue;
                }

                const ids = cellValue as string[];

                const textArr: string[] = [];
                ids.forEach(id => {
                    const isExist = table.isExist(id); // baseTable中是否存在
                    if (isExist === false) {
                        textArr.push(id);
                    } else {
                        const codeRow: any = table.getById(id);
                        textArr.push(codeRow.name);
                    }
                });

                const finalText = textArr.join(", ");

                const length = finalText.length;
                if (length <= textDisplayLength) {
                    return finalText;
                }

                const newCellText = finalText.substr(0, textDisplayLength) + "...";

                return newCellText;
            }
        };

        this.columnDefines.push(col);
        return col;
    };

    public AddSwitch = ({
        title,
        key,
        dataIndex,
        dataType,
        enableSearch = true,
        canAutoOrder = true,
        width = 100,
        handler
    }: IColumnDefine): IColumnSortDefine => {

        const col: IColumnSortDefine = {
            title: formatTitle(title, width, enableSearch, canAutoOrder),
            key,
            dataIndex,
            dataType,
            width,
            render: (cellValue: any, row: object, index: number): any => {
                return (
                    <div>
                        <Switch
                            checkedChildren={"ON"}
                            unCheckedChildren={"OFF"}
                            checked={cellValue}
                            onChange={checked => { handler && handler["onChange"](checked, row) }}
                        />
                    </div>
                );
            }
        };
        this.columnDefines.push(col);
        return col;
    };

    // ============================================================================
    // --------------------------- 统一操作列 -------------------------------------

    /** 删除按钮 */
    public AddButtonDelete = (onDelete: (deleteRow: any) => void): void => {
        const buttonFunc: IOptColumnRender = (row: any) => {
            const handleConfirm = () => {
                onDelete(row);
            };

            return (
                <Popconfirm key="Delete" title="确定要删除吗？" onConfirm={handleConfirm}>
                    <a className="cf-table-delete-btn">删除</a>
                </Popconfirm>
            );
        };
        this.optColumnRenders.push(buttonFunc);
    };

    /** 编辑按钮 */
    public AddButtonEdit = (onEditing: (editRow: any) => void): void => {
        this.AddButton("编辑", onEditing);
    };

    /** 自定义名称按钮 */
    public AddButton = (
        buttonName: string,
        onClick: (clickRow: any) => void,
        option?: {
            onGetConfirmText?: (row: any) => string;
            onCanDisplay?: (row: any) => boolean;
            /** 对齐美观，优先使用 */
            onCanDisabled?: (row: any) => boolean;
        }
    ): void => {
        const render = (row: any) => {
            const handleClick = () => onClick(row);

            if (option != null) {
                if (option.onCanDisplay != null) {
                    if (option.onCanDisplay(row) === false) {
                        return undefined;
                    }
                }
                if (option.onCanDisabled != null) {
                    if (option.onCanDisabled(row) === true) {
                        return <span>{buttonName}</span>;
                    }
                }

                if (option.onGetConfirmText != null) {
                    const confirmText = option.onGetConfirmText(row);

                    return (
                        <Popconfirm key={buttonName} title={confirmText} onConfirm={handleClick}>
                            <a className="cf-table-delete-btn">{buttonName}</a>
                        </Popconfirm>
                    );
                }
            }

            return (
                <a key={buttonName} onClick={handleClick}>
                    {buttonName}
                </a>
            );
        };
        this.optColumnRenders.push(render);
    };

    /** 自定义渲染 */
    public AddButtonRender = (onRender: (row: any) => React.ReactNode): void => {
        this.optColumnRenders.push(onRender);
    };

    public AddButtonGroup = (): IOptGroup => {
        const group = new OptGroup();
        this.optGroups.push(group);
        return group;
    };
}

// ===============================================
// 排序
// const rowSorter = (row1: object, row2: object, field: string) => {
//     const a = row1[field];
//     const b = row2[field];
//     if (a === b) {
//         return 0;
//     }
//     if (typeof a === "string" && typeof b === "string") {
//         return a > b ? 1 : -1;
//     }
//     if (typeof a === "string") {
//         return 1;
//     }
//     if (typeof b === "string") {
//         return -1;
//     }

//     return a - b;
// };
