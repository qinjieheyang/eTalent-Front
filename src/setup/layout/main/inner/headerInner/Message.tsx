import { Badge, Dropdown, Icon, Menu } from "antd";
import * as React from "react";
import { IconBlock } from "./IconBlock";

interface IMessage {
    id: string;
    title: string;
    remark: string;
}

export interface IMessageProps {
    msgRows: IMessage[];
}

export default class Message extends React.Component<IMessageProps> {
    constructor(props: IMessageProps) {
        super(props);
    }

    public ini(): void {
        //
    }

    public render() {
        const menus = this.getMenus();
        return (
            <IconBlock>
                <Dropdown overlay={menus}>
                    <span>
                        <Badge count={this.props.msgRows.length}>
                            <a href="#" className="head-example" />

                            <Icon type="bell" style={{ fontSize: "1.5em" }} />
                        </Badge>
                    </span>
                </Dropdown>
            </IconBlock>
        );
    }

    private getMenus = () => {
        return <Menu>{this.getMenuItems()}</Menu>;
    };

    private getMenuItems = () => {
        const items = new Array<any>();
        this.props.msgRows.forEach(row => {
            const item = (
                <Menu.Item key={row.id}>
                    <a onClick={this.handleClick}> {row.title}</a>
                </Menu.Item>
            );
            items.push(item);
        });

        return items;
    };

    private handleClick = () => {};
}
