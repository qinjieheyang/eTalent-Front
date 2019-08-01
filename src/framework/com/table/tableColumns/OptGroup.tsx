import { Dropdown, Icon, Menu, Popconfirm } from "antd";
import * as React from "react";

export interface IOptGroup {
    text: string;
    add(
        btnName: string,
        onClick: (clickRow: any) => void,
        option?: {
            onGetConfirmText?: (row: any) => string;
            onCanDisplay?: (row: any) => boolean;
        }
    ): void;
}

export interface IOptGroupBtn {
    text: string;
    onClick: (row: any) => void;
    option?: {
        onGetConfirmText?: (row: any) => string;
        onCanDisplay?: (row: any) => boolean;
    };
}

export class OptGroup implements IOptGroup {
    public text: string = "更多";
    private opts: IOptGroupBtn[] = [];
    public add = (
        btnText: string,
        onClick: (row: any) => void,
        option?: {
            onGetConfirmText?: (row: any) => string;
            onCanDisplay?: (row: any) => boolean;
        }
    ): void => {
        this.opts.push({ text: btnText, onClick, option });
    };
    public onRender = (row: any): React.ReactNode => {
        const menuItems = this.getMenuItems(row);
        if (menuItems.length === 0) {
            return undefined;
        }
        const menu = <Menu>{menuItems}</Menu>;
        return (
            <Dropdown key={this.text} overlay={menu}>
                <a className="ant-dropdown-link">
                    {this.text} <Icon type="down" />
                </a>
            </Dropdown>
        );
    };
    private getMenuItems(row: any): React.ReactNode[] {
        const menuItems: React.ReactNode[] = [];

        for (const btnInfo of this.opts) {
            const handleClick = () => btnInfo.onClick(row);

            if (btnInfo.option == null) {
                menuItems.push(
                    <Menu.Item key={btnInfo.text}>
                        <a onClick={handleClick}>{btnInfo.text}</a>
                    </Menu.Item>
                );
                continue;
            }

            if (btnInfo.option.onCanDisplay != null) {
                if (btnInfo.option.onCanDisplay(row) === false) {
                    continue;
                }
            }

            if (btnInfo.option.onGetConfirmText != null) {
                const confirmText = btnInfo.option.onGetConfirmText(row);
                menuItems.push(
                    <Menu.Item key={btnInfo.text}>
                        <Popconfirm key={btnInfo.text} title={confirmText} onConfirm={handleClick}>
                            <a>{btnInfo.text}</a>
                        </Popconfirm>
                    </Menu.Item>
                );
            } else {
                menuItems.push(
                    <Menu.Item key={btnInfo.text}>
                        <a onClick={handleClick}>{btnInfo.text}</a>
                    </Menu.Item>
                );
            }
        }
        return menuItems;
    }
}
