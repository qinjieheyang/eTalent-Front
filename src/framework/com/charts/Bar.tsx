// tslint:disable-next-line:ordered-imports
import { Axis, Chart as BizChart, Geom, Legend, Tooltip } from "bizcharts";
import * as React from "react";

export interface IBarDataItem {
    group?: string;
    name: string;
    iValue: number;
}

export interface IBarProps {
    data: IBarDataItem[];
    height?: number;
}

/** 图表 */
export class Bar extends React.Component<IBarProps> {
    public render() {
        return (
            <BizChart height={this.getHeight()} data={getData(this.props.data)} forceFit={true}>
                <Legend />
                <Axis name="name" />
                <Axis name="iValue" />
                <Tooltip
                    crosshairs={{
                        type: "y"
                    }}
                />
                <Geom
                    type="interval"
                    position="name*iValue"
                    color={"group"}
                    adjust={[
                        {
                            type: "dodge",
                            marginRatio: 1 / 32
                        }
                    ]}
                />
            </BizChart>
        );
    }

    private getHeight = () => {
        return this.props.height ? this.props.height : 400;
    };
}

// ===============================- 饼图 -=====================

function getData(items: IBarDataItem[]): IBarDataItem[] {
    const newItems: IBarDataItem[] = [];
    let sum = 0;
    items.forEach(item => {
        sum = sum + item.iValue;
    });
    const avg = sum / items.length;
    items.forEach(item => {
        const newItem: any = { ...item };
        newItem.平均 = avg;
        newItems.push(newItem);
    });
    return newItems;
}
