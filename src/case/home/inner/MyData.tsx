import { Card, Row, Col } from "antd";
import * as React from "react";
import { IMonthData } from "../State";

interface IProps {
    monthData: IMonthData;
}

export class MyData extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Card title="我的整体数据" bordered={false} style={{margin:5}}>
                <Row>
                    <Col span={12}>
                        <h3>本月</h3>
                        <p>mony：{this.props.monthData.projectMoney}</p>
                        <p>项目数量：{this.props.monthData.projectCount}</p>
                        <p>较上月：{this.props.monthData.monthIncrease}</p>
                        <p>较上年：{this.props.monthData.yearIncrease}</p>
                    </Col>
                    <Col span={12}>。。。。年度数据</Col>
                </Row>
            </Card>
        );
    }
}
