// tslint:disable-next-line:ordered-imports
import { Axis, Chart as BizChart, Coord, Geom, Label } from "bizcharts";
import * as React from "react";

export interface IPieDataItem {
    name: string;
    iValue: number;
}

export interface IPieProps {
    data: IPieDataItem[];
    height?: number;
}

/** 图表 */
export class Pie extends React.Component<IPieProps> {
    public render() {
        // 饼图
        return (
            <BizChart
                height={this.getHeight()}
                data={getDataPie(this.props.data)}
                scale={colsPie}
                padding={[10, 10, 10, 10]}
                forceFit={true}
            >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />

                <Geom
                    type="intervalStack"
                    position="percent"
                    color="name"
                    tooltip={[
                        "name*percent",
                        (name, percent) => {
                            percent = percent * 100 + "%";
                            return {
                                name,
                                value: percent
                            };
                        }
                    ]}
                    style={{
                        lineWidth: 1,
                        stroke: "#fff"
                    }}
                >
                    <Label
                        content="percent"
                        formatter={this.formatter}
                        offset={-40}
                        textStyle={{
                            rotate: 0,
                            textAlign: "center",
                            shadowBlur: 2,
                            shadowColor: "rgba(0, 0, 0, .45)"
                        }}
                    />
                </Geom>
            </BizChart>
        );
    }

    private getHeight = () => {
        return this.props.height ? this.props.height : 400;
    };

    private formatter = (percent: any, item: any): any => {
        return item.point.name + ":" + item.point.iValue;
    };
}

const colsPie = {
    percent: {
        formatter: (val: any) => {
            val = val * 100 + "%";
            return val;
        }
    }
};

function getDataPie(items: IPieDataItem[]): IPieDataItem[] {
    const newItems: IPieDataItem[] = [];
    let sum = 0;
    items.forEach(item => {
        sum = sum + item.iValue;
    });
    items.forEach(item => {
        const newItem: any = { ...item };
        newItem.percent = item.iValue / sum;
        newItems.push(newItem);
    });
    return newItems;
}
