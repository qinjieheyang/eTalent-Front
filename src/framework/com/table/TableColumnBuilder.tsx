import { Divider, Popconfirm, Switch, Tooltip, Checkbox } from "antd";
import * as React from "react";

import { DataTable } from "../../data/dataTable/DataTable";
import { UtilNumber } from "../../utils/UtilNumber";
import { UtilLog } from "../../utils/UtilLog";
import { IColumnDefine } from "./tableColumns/IColumnDefine";
import { IOptGroup, OptGroup } from "./tableColumns/OptGroup";

export type IColumnRender = (cellValue: any, row: object, index: number) => React.ReactElement<any>;

export type IOptColumnRender = (row: any) => React.ReactNode;


interface IColumnSortDefine extends IColumnDefine {
    sorter?: any;
}

interface FilterDropdownProps {
    setSelectedKeys: (target: string[]) => void;
    selectedKeys: string[];
    confirm: () => void;
    clearFilters: ()=> void;
}

export type IFilterDropdown = (props: FilterDropdownProps)  => React.ReactElement<any>;

export class TableColumnBuilder {
    private optGroups: OptGroup[] = [];
    public set OptColumnWidth(width: number) {
        this.optColumnWidth = width;
    }

    private columnDefines: IColumnSortDefine[] = [];
    private optColumnRenders: IOptColumnRender[] = [];
    private optColumnWidth: number = 100;

    private mapSelectTable = new Map<string, DataTable>();

    constructor() {
        this.columnDefines = [];
        this.optColumnRenders = [];
    }

    public GetColumns = (onColumnsChange?: (newColumns: IColumnSortDefine[]) => void) => {
        const columns: IColumnSortDefine[] = [];
        for (const c of this.columnDefines) {
            columns.push(c);

            if (c.canAutoOrder) {
                c.sorter = (row1: object, row2: object) => rowSorter(row1, row2, c.dataIndex);
            }
        }
        if (this.optColumnRenders.length === 0) {
            return columns;
        }
        

        const optColumn: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: "操作",
            key: "operationColumn",
            width: this.optColumnWidth,
            title: "操作",
            render: (cellValue: any, row: any, index: number): React.ReactElement<any> => {
                return (
                    <span>
                        {this.optColumnRenders.map((createButtonFunc, i, array) => {
                            if (i < array.length - 1) {
                                // not the last element
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
            filterDropdown: (props: FilterDropdownProps): React.ReactElement<any> => {
                // const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
                const filterColumns: IColumnSortDefine[] =  columns.slice(0, -1); //去除操作项
                const defaultValues: string[] = [];
                const plainOptions: any[] = filterColumns.map((column: any, index: number) =>{
                    defaultValues.push(column.key);
                    return { label: column.title, value: column.key }
                });

                const onColChange = onColumnsChange? onColumnsChange : function(){};

                const onChangeFunc = (checkedColumnValues: string[])  =>{
                    const newColumns: IColumnSortDefine[] = [];
                    for (const col of this.columnDefines) {
                        if(checkedColumnValues.indexOf(col.key) || col.key === "operationColumn"){
                            newColumns.push(col)
                        }
                    }
                    onColChange(newColumns);
                    // return newColumns;
                }

                return (
                    <div className="custom-filter-dropdown">
                        <Checkbox.Group 
                            options={plainOptions} 
                            defaultValue={defaultValues} 
                            onChange={(checkedValues: string[]) => {
                                onChangeFunc(checkedValues);
                            }} 
                        />
                    </div>
                )
            }
        };

        columns.push(optColumn);

        return columns;
    };


   
    // -----------------------------------------------------------------------------------------------------------------

    /** 排序号 */
    public AddSortNum = (title: string, width = 20): IColumnDefine => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: "__SortNum",
            key: "__SortNum",
            render: (cellValue: any, row: object, index: number): any => {
                const indexLabel = index + 1;
                return <Tooltip title={indexLabel}>{indexLabel}</Tooltip>;
            },
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddText = (title: string, fieldName: string, textDisplayLength = 20, width = 100): IColumnDefine => {
        if (!textDisplayLength) {
            textDisplayLength = 20;
        }
        if (textDisplayLength < 1) {
            textDisplayLength = 20;
        }

        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                if (cellValue == null) {
                    return "";
                }

                if (typeof cellValue !== "string") {
                    UtilLog.error("文本列不能包含文本值", { fieldName, cellValue });
                    throw new Error("列非文本类型, 在：" + fieldName + "=" + cellValue);
                }

                const length = cellValue.length;
                if (length <= textDisplayLength) {
                    return col.prefixText ? col.prefixText + cellValue : cellValue;
                }
                let newCellText = cellValue.substr(0, textDisplayLength);
                newCellText = newCellText + "...";

                return <Tooltip title={cellValue}>{col.prefixText ? col.prefixText + cellValue : newCellText}</Tooltip>;
            },
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddBool = (
        title: string,
        fieldName: string,
        trueValue = "是",
        falseValue = "否",
        width = 50
    ): IColumnDefine => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                const val = row[fieldName];
                if (val === "" || val == null) {
                    return "";
                }

                if (val === true) {
                    return trueValue;
                }
                if (val === false) {
                    return falseValue;
                }

                return ":" + val;
            },
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddNumber = (title: string, fieldName: string, width = 50): IColumnDefine => {
        const col: IColumnSortDefine = { canAutoOrder: false, dataIndex: fieldName, key: fieldName, title, width };
        this.columnDefines.push(col);
        return col;
    };

    public AddMoney = (title: string, fieldName: string, width = 50): IColumnDefine => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number) => {
                return UtilNumber.numberToRMB(cellValue, "￥") as any;
            },
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddCustomRender = (
        title: string,
        fieldName: string,
        render: (cellValue: any, row: object, index: number) => any,
        width = 100
    ): IColumnDefine => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render,
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    /** 年-月-日 时：分：秒 */
    public AddDateYYYYMMDDHHmm = (title: string, fieldName: string, width = 100): IColumnDefine => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                if (!cellValue || cellValue === "") {
                    return "";
                }
                const date2 = new Date(cellValue);
                const localeString = `${date2.getFullYear()}年${date2.getMonth() +
                    1}月${date2.getDate()}日${date2.getHours()}时${date2.getMinutes()}分`;
                return localeString;
            },
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    /** 年-月-日 */
    public AddDate = (title: string, fieldName: string, width = 100) => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                if (!cellValue || cellValue === "") {
                    return "";
                }

                const date2 = new Date(cellValue);
                const localeString = `${date2.getFullYear()}年${date2.getMonth() + 1}月${date2.getDate()}日`;
                return localeString;
            },
            title,
            width
        };
        this.columnDefines.push(col);
        return col;
    };

    public AddYearMonth = (title: string, fieldName: string, width = 100, isAutoOrderColumn = false) => {
        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                const date2 = new Date(cellValue);
                const localeString = `${date2.getFullYear()}年${date2.getMonth() + 1}月`;
                return localeString;
            },
            title,
            width
        };

        this.columnDefines.push(col);
        return col;
    };

    /** ID到名称的转换 ,性能低下以后优化 */
    public AddIdToName = (
        title: string,
        fieldName: string,
        rowItems: any[],
        width = 100,
        isAutoOrderColumn = false
    ): IColumnSortDefine => {
        const selectTable = new DataTable(rowItems);
        this.mapSelectTable.set(fieldName, selectTable);

        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                const table = this.mapSelectTable.get(fieldName);
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
            title,
            width
        };

        this.columnDefines.push(col);
        return col;
    };

    /** TODO:ID到名称的转换 ,性能低下以后优化 */
    public AddIdArrayToName = (
        title: string,
        fieldName: string,
        rowItems: any[],
        width = 100,
        isAutoOrderColumn = false,
        textDisplayLength = 30
    ): IColumnSortDefine => {
        const selectTable = new DataTable(rowItems);
        this.mapSelectTable.set(fieldName, selectTable);

        const col: IColumnSortDefine = {
            canAutoOrder: false,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                if (cellValue) {
                    if (cellValue.constructor !== Array) {
                        throw new Error(fieldName + " | 字段值非string数组");
                    }
                }
                const table = this.mapSelectTable.get(fieldName);
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

                return <Tooltip title={finalText}>{newCellText}</Tooltip>;
            },
            title,
            width
        };

        this.columnDefines.push(col);
        return col;
    };

    public AddSwitch = (
        title: string,
        fieldName: string,
        trueValue = "是",
        falseValue = "否",
        handleSwitchChange: (value: boolean, row: any) => void,
        width = 50
    ): IColumnDefine => {
        const col: IColumnSortDefine = {
            canAutoOrder: true,
            dataIndex: fieldName,
            key: fieldName,
            render: (cellValue: any, row: object, index: number): any => {
                return (
                    <div>
                        <Switch
                            checkedChildren={trueValue}
                            unCheckedChildren={falseValue}
                            checked={cellValue}
                            onChange={handleSwitchChange.bind(this, row)}
                        />
                    </div>
                );
            },
            title,
            width
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

const rowSorter = (row1: object, row2: object, field: string) => {
    const a = row1[field];
    const b = row2[field];
    if (a === b) {
        return 0;
    }
    if (typeof a === "string" && typeof b === "string") {
        return a > b ? 1 : -1;
    }
    if (typeof a === "string") {
        return 1;
    }
    if (typeof b === "string") {
        return -1;
    }

    return a - b;
};
