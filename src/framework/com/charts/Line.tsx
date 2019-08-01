// tslint:disable-next-line:ordered-imports
import { Axis, Chart as BizChart, Geom, Legend, Tooltip } from "bizcharts";
import * as React from "react";

export interface ILineDataItem {
    group?: string;
    name: string;
    iValue: number;
}

export interface ILineProps {
    data: ILineDataItem[];
    height?: number;
}

/** 图表 */
export class Line extends React.Component<ILineProps> {
    public render() {
        this.checkData();
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
                <Geom type="line" position="name*iValue" size={2} color={"group"} />
                <Geom type="point" position="name*iValue" size={4} shape={"circle"} color={"group"} />
            </BizChart>
        );
    }

    private getHeight = () => {
        return this.props.height ? this.props.height : 400;
    };

    private checkData=()=>{
        this.props.data.forEach(  (item:ILineDataItem ,idx:number )=>{
            if(item.name == null ){
                throw new Error( "props.data["+idx+"].name不能为空" );
            }
            if(item.iValue == null ){
                throw new Error( "props.data["+idx+"].iValue不能为空" );
            }
        } );
    }
}

function getData(items: ILineDataItem[]): ILineDataItem[] {
    const newItems: ILineDataItem[] = [];
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
