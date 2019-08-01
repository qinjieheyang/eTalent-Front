// tslint:disable-next-line:ordered-imports

import { Axis, Chart, Coord, Geom, Legend, Tooltip } from "bizcharts";
import * as React from "react";
import { DataSet } from "./bizcharts.d";

interface IRadarDataItem {
    group?: string;
    name: string;
    iValue: number;
}

/*

group   |   name   |   ivalue
a       Design     70
b       Design     30
*/

interface IRadarProps {
    data: IRadarDataItem[];
    height?: number;
}

/** 图表 */
export class Radar extends React.Component<IRadarProps> {
    public render() {
        const { DataView } = DataSet;
        const data = [
            {
                item: "Design",
                a: 70,
                b: 30
            },
            {
                item: "Development",
                a: 60,
                b: 70
            },
            {
                item: "Marketing",
                a: 50,
                b: 60
            },
            {
                item: "Users",
                a: 40,
                b: 50
            },
            {
                item: "Test",
                a: 60,
                b: 70
            },
            {
                item: "Language",
                a: 70,
                b: 50
            },
            {
                item: "Technology",
                a: 50,
                b: 40
            },
            {
                item: "Support",
                a: 30,
                b: 40
            },
            {
                item: "Sales",
                a: 60,
                b: 40
            },
            {
                item: "UX",
                a: 50,
                b: 60
            }
        ];
        const dv = new DataView().source(data);
        dv.transform({
            type: "fold",
            fields: ["a", "b"],
            // 展开字段集
            key: "user",
            // key字段
            value: "score" // value字段
        });
        const cols = {
            score: {
                min: 0,
                max: 80
            },
            user: { formatter: (val: any) => ({ a: "当前岗位组成", b: "优化后岗位组成" }[val]) }
        };
        return (
            <div>
                <Chart height={this.getHeight()} data={dv} padding={[20, 20, 95, 20]} scale={cols} forceFit>
                    <Coord type="polar" radius={0.8} />
                    <Axis
                        name="item"
                        line={undefined}
                        tickLine={undefined}
                        grid={{
                            lineStyle: {
                                lineDash: undefined
                            },
                            hideFirstLine: false
                        }}
                    />
                    <Tooltip />
                    <Axis
                        name="score"
                        line={undefined}
                        tickLine={undefined}
                        grid={{
                            type: "polygon",
                            lineStyle: {
                                lineDash: undefined
                            },
                            alternateColor: "rgba(0, 0, 0, 0.04)"
                        }}
                    />
                    <Legend name="user" marker="circle" />
                    <Geom type="line" position="item*score" color="user" size={2} />
                    <Geom
                        type="point"
                        position="item*score"
                        color="user"
                        shape="circle"
                        size={4}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1,
                            fillOpacity: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }

    private getHeight = () => {
        return this.props.height ? this.props.height : 400;
    };
}
