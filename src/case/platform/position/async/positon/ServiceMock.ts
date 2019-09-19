//  负责伪造后端 WebApi数据

import { IState } from "./State";

export class ServiceMock {
    public constructor() { }

    // 数据初始化
    public getInit = async (): Promise<{ initData: IState; }> => {
        const columns_0 = [
            {
                title: "职级",
                key: "level",
                dataIndex: "level",
                width: 65
            },
            {
                title: "研发族",
                key: "1",
                children: [
                    {
                        title: "职位",
                        dataIndex: "key11",
                        key: "key11",
                        render: (cellValue: any, row: any) => {
                            const obj = {
                                children: cellValue,
                                props: {}
                            };
                            if (row.key11rowSpan >= 0) {
                                obj.props["rowSpan"] = row.key11rowSpan || 0;
                            }
                            return obj;
                        }
                    },
                    {
                        title: "职等",
                        dataIndex: "key12",
                        key: "key12"
                    }
                ]
            },
            {
                title: "销售族",
                key: "2",
                children: [
                    {
                        title: "职位",
                        dataIndex: "key21",
                        key: "key21",
                        render: (cellValue: any, row: any) => {
                            const obj = {
                                children: cellValue,
                                props: {}
                            };
                            if (row["key21rowSpan"] >= 0) {
                                obj.props["rowSpan"] = row["key21rowSpan"] || 0;
                            }
                            return obj;
                        }
                    },
                    {
                        title: "职等",
                        dataIndex: "key22",
                        key: "key22",
                        render: (cellValue: any, row: any) => {
                            const obj = {
                                children: cellValue,
                                props: {}
                            };
                            if (row["key22rowSpan"] >= 0) {
                                obj.props["rowSpan"] = row["key22rowSpan"] || 0;
                            }
                            return obj;
                        }
                    }
                ]
            },
            {
                title: "实施族",
                key: "3",
                children: [
                    {
                        title: "职位",
                        dataIndex: "key31",
                        key: "key31"
                    },
                    {
                        title: "职等",
                        dataIndex: "key32",
                        key: "key32"
                    }
                ]
            },
            {
                title: "职能族",
                key: "4",
                children: [
                    {
                        title: "职位",
                        dataIndex: "key41",
                        key: "key41"
                    },
                    {
                        title: "职等",
                        dataIndex: "key42",
                        key: "key42"
                    }
                ]
            }
        ];

        const data_0 = [
            {
                level: 10,
                // key11: "xx",
                // key12: "xx",
                // key21: "xx",
                // key22: "xx",
                // key31: "xx",
                // key32: "xx",
                // key41: "xx",
                // key42: "xx",
                key: 10
            },
            {
                level: 9,
                key: 9,
                key11: "xx",
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 8,
                key: 8,
                key11: "xx",
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 7,
                key: 7,
                key11: "xx",
                key12: "xx",
                key21: "xx",
                key21rowSpan: 2,
                key22: "xx",
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 6,
                key: 6,
                key11: "xx",
                key12: "xx",
                key21: "xx",
                key21rowSpan: 0,
                key22: "xx",
                key22rowSpan: 4,
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 5,
                key: 5,
                key11: "xx",
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key22rowSpan: 0,
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 4,
                key: 4,
                key11: "xx",
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key22rowSpan: 0,
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 3,
                key: 3,
                key11: "xx",
                key11rowSpan: 3,
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key22rowSpan: 0,
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 2,
                key: 2,
                key11rowSpan: 0,
                // key11: "xx",
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            },
            {
                level: 1,
                key: 1,
                key11rowSpan: 0,
                // key11: "xx",
                key12: "xx",
                key21: "xx",
                key22: "xx",
                key31: "xx",
                key32: "xx",
                key41: "xx",
                key42: "xx"
            }
        ];

        const columns_1 = [
            {
                title: "职位族",
                key: "key1",
                dataIndex: "key1",
                render: (cellValue: any, row: any) => {
                    const obj = {
                        children: cellValue,
                        props: {}
                    };
                    if (row.key1rowSpan >= 0) {
                        obj.props["rowSpan"] = row.key1rowSpan || 0;
                    }
                    return obj;
                }
            },
            {
                title: "职位",
                key: "key2",
                dataIndex: "key2",
                render: (cellValue: any, row: any) => {
                    const obj = {
                        children: cellValue,
                        props: {}
                    };
                    if (row.key2rowSpan >= 0) {
                        obj.props["rowSpan"] = row.key2rowSpan || 0;
                    }
                    return obj;
                }
            },
            {
                title: "职等",
                key: "key3",
                dataIndex: "key3",
                render: (cellValue: any, row: any) => {
                    const obj = {
                        children: cellValue,
                        props: {}
                    };
                    if (row.key3rowSpan >= 0) {
                        obj.props["rowSpan"] = row.key3rowSpan || 0;
                    }
                    return obj;
                }
            },
            {
                title: "职级",
                key: "key4",
                dataIndex: "key4"
            }
        ];

        const data_1 = [
            {
                key1: "研发族",
                key1rowSpan: 5,
                key2: "前段开发",
                key2rowSpan: 3,
                key3: "中级",
                key3rowSpan: 2,
                key4: "1"
            },
            {
                key1rowSpan: 0,
                key2rowSpan: 0,
                key3rowSpan: 0,
                key4: "2"
            },
            {
                key1rowSpan: 0,
                key2rowSpan: 0,
                key3: "高级",
                key4: "3"
            },
            {
                key1rowSpan: 0,
                key2: "后端开发",
                key2rowSpan: 2,
                key3: "中级",
                key3rowSpan: 2,
                key4: "1"
            },
            {
                key1rowSpan: 0,
                key2rowSpan: 0,
                key3rowSpan: 0,
                key4: "2"
            }
        ];

        const columnCollection = [columns_0, columns_1];
        const dataCollection = [data_0, data_1];
        const initData: IState = {
            PS_columnCollection: columnCollection,
            PS_dataCollection: dataCollection
        } as any;
        return { initData };
    };

    //新增职位族
    public addPositionGroup = async () => {

    }

    //删除职位族
    public deletePositionGroup = async () => {

    }

    //编辑职位族
    public editPositionGroup = async () => {

    }

    //获取所有的职位族
    public getAllPositionGroup = async () => {

    }

    //职位族排序
    public sortPositionGroup = async () => {

    }

    //职位族导出excel
    public downloadPositionGroupExcel = async () => {

    }

    //新增职等
    public addPositionGrade = async () => {

    }

    //删除职等
    public deletePositionGrade = async () => {

    }

    //编辑职等
    public editPositionGrade = async () => {

    }

    //分页查询职等列表
    public getPositionGradeList = async () => {

    }

    //新增职级
    public addPositionLevel = async () => {

    }

    //删除职级
    public deletePositionLevel = async () => {

    }

    //编辑职级
    public editPositionLevel = async () => {

    }

    //分页查询职级列表
    public getPositionLevelList = async () => {

    }

    //按职级展示职位体系
    public showByPositionLevel = async () => {

    }

    //新增职位
    public addPosition = async () => {

    }

    //删除职位
    public deletePosition = async () => {

    }

    //职位导出excel
    public downloadPositionExcel = async () => {

    }

    //编辑职位
    public editPosition = async () => {

    }

    //分页查询职位信息
    public getPositionList = async () => {

    }

    //职位排序
    public sortPosition = async () => {

    }

    //按职位展示职位体系
    public showByPosition = async () => {

    }

}

export interface IService extends ServiceMock { }
