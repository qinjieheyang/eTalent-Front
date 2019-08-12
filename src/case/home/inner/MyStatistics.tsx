import { Card } from "antd";
import * as React from "react";
import Framework from "src/framework/Framework";

interface IProps {}

export class MyStatistics extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Card title="统计数据" bordered={false}  style={{margin:5}}>
                <Framework.Com.charts.Radar data={[]} />
            </Card>
        );
    }
}
