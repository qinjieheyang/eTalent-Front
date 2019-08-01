import { Card } from "antd";
import * as React from "react";

interface IProps {
    userName: string;
}

export class Me extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Card title={"HI !" + this.props.userName} bordered={false}>
                {new Date().toTimeString()}
            </Card>
        );
    }
}
