//  负责伪造后端 WebApi数据

// import { IState } from "./State";
import Mock from 'mockjs';

export class ServiceMock {
    public constructor() { }

    // 数据初始化
    // public getInit = async (): Promise<{ initData: IState; }> => {

    //     const data_0 = [
    //         {
    //             level: 10,
    //             // key11: "xx",
    //             // key12: "xx",
    //             // key21: "xx",
    //             // key22: "xx",
    //             // key31: "xx",
    //             // key32: "xx",
    //             // key41: "xx",
    //             // key42: "xx",
    //             key: 10
    //         },
    //         {
    //             level: 9,
    //             key: 9,
    //             key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 8,
    //             key: 8,
    //             key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 7,
    //             key: 7,
    //             key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key21rowSpan: 2,
    //             key22: "xx",
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 6,
    //             key: 6,
    //             key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key21rowSpan: 0,
    //             key22: "xx",
    //             key22rowSpan: 4,
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 5,
    //             key: 5,
    //             key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key22rowSpan: 0,
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 4,
    //             key: 4,
    //             key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key22rowSpan: 0,
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 3,
    //             key: 3,
    //             key11: "xx",
    //             key11rowSpan: 3,
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key22rowSpan: 0,
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 2,
    //             key: 2,
    //             key11rowSpan: 0,
    //             // key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         },
    //         {
    //             level: 1,
    //             key: 1,
    //             key11rowSpan: 0,
    //             // key11: "xx",
    //             key12: "xx",
    //             key21: "xx",
    //             key22: "xx",
    //             key31: "xx",
    //             key32: "xx",
    //             key41: "xx",
    //             key42: "xx"
    //         }
    //     ];



    //     const data_1 = [
    //         {
    //             key1: "研发族",
    //             key1rowSpan: 5,
    //             key2: "前段开发",
    //             key2rowSpan: 3,
    //             key3: "中级",
    //             key3rowSpan: 2,
    //             key4: "1"
    //         },
    //         {
    //             key1rowSpan: 0,
    //             key2rowSpan: 0,
    //             key3rowSpan: 0,
    //             key4: "2"
    //         },
    //         {
    //             key1rowSpan: 0,
    //             key2rowSpan: 0,
    //             key3: "高级",
    //             key4: "3"
    //         },
    //         {
    //             key1rowSpan: 0,
    //             key2: "后端开发",
    //             key2rowSpan: 2,
    //             key3: "中级",
    //             key3rowSpan: 2,
    //             key4: "1"
    //         },
    //         {
    //             key1rowSpan: 0,
    //             key2rowSpan: 0,
    //             key3rowSpan: 0,
    //             key4: "2"
    //         }
    //     ];

    // };

    //按职级展示职位体系
    public showByPositionLevel = async () => {

        return Mock.mock({
            // {[{"positionGroupName":"研发族"},{"positionGroupName":"销售族"}]:[{"positionGroups":[{"positionGradeNames":"专家","positionGradeNamesRowSpan":3,"positionNames":"前端开发","positionNamesRowSpan":2}],"positionLevelName":"1级"}]}
            columns: [
                {
                    title: "研发族",
                    key: "positionGroupName1",
                },
                {
                    title: "销售族",
                    key: "positionGroupName2",
                },
                {
                    title: "实施族",
                    key: "positionGroupName3",
                },
                {
                    title: "职能族",
                    key: "positionGroupName4",
                },
            ],
            list: [
                {
                    positionLevelName: "1级",
                    // positionGroupName1: "研发族XXX",
                    positionGroupName1Postion: "专员",
                    positionGroupName1PostionRowSpan: 3,
                    positionGroupName1Grade: "产品设计",
                    positionGroupName1GradeRowSpan: 2,
                },
                {
                    positionLevelName: "2级",
                    // positionGroupName1: "研发族XXX",
                    positionGroupName1Postion: "专员",
                    positionGroupName1PostionRowSpan: 0,
                    positionGroupName1Grade: "产品设计",
                    positionGroupName1GradeRowSpan: 0,
                },
                {
                    positionLevelName: "3级",
                    // positionGroupName1: "研发族XXX",
                    positionGroupName1Postion: "专员",
                    positionGroupName1PostionRowSpan: 0,
                    positionGroupName1Grade: "前段开发"
                },
            ]
        })
    }

    //按职位展示职位体系
    public showByPosition = async () => {
        return Mock.mock({
            columns: [
                {
                    title: "职位族",
                    key: "positionGroupName",
                },
                {
                    title: "职位",
                    key: "positionName",
                },
                {
                    title: "职等",
                    key: "positionGradeName",
                },
                {
                    title: "职级",
                    key: "positionLevelName",
                },
            ],
            tableData: []
        })

    }

}

export interface IService extends ServiceMock { }
