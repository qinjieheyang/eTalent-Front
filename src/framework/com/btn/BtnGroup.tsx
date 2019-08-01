import { Button, Dropdown, Menu } from "antd";
import * as React from "react";

export interface IBtnGroupProps {
    /** 默认[更多] */
    text?: string;
    /** 默认[更多图标] */
    iconSvg?: string;
}

/** 按钮Group */
export class BtnGroup extends React.Component<IBtnGroupProps> {
    public render() {
        const title = this.props.text ? this.props.text : "更多";
        const menu = getMenu(this.props.children);
        return (
            <Dropdown overlay={menu}>
                <Button>{title}</Button>
            </Dropdown>
        );
    }
}

// -----------------------------------------------------------------------

const getMenu = (children: any) => {
    if (children == null) {
        return children;
    }
    if (children instanceof Array === false) {
        return (
            <Menu>
                <Menu.Item>{children}</Menu.Item>
            </Menu>
        );
    }

    const oldChildren: any[] = children as any[];
    const newChildren: any[] = [];
    let key = 0;
    for (const oldChild of oldChildren) {
        key = key + 1;
        newChildren.push(<Menu.Item key={key}> {oldChild}</Menu.Item>);
    }

    return <Menu>{newChildren}</Menu>;
};

// tslint:disable-next-line:max-classes-per-fil
export interface IBtnGroupBtnProps {
    /** 默认[更多图标] */
    onClick?: () => void;
}
// tslint:disable-next-line:max-classes-per-file
export class BtnGroupBtn extends React.Component<IBtnGroupBtnProps> {
    public render = () => {
        return <a onClick={this.props.onClick}>{this.props.children}</a>;
    };
}
