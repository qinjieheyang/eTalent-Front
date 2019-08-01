import { Layout } from "antd";
import * as React from "react";
import { IMessageRow } from "../State";
import Help from "./headerInner/Help";
import LoginUser from "./headerInner/LoginUser";
import Message from "./headerInner/Message";
import Setting from "./headerInner/Setting";

interface IHeaderProps {
    onLoginOff: () => void;
    messages: IMessageRow[];
}

export default class Header extends React.Component<IHeaderProps> {
    constructor(props: IHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <Layout.Header style={{ background: "#fff", padding: 0 }}>
                <div style={{ float: "right", padding: "5px 25px 5px 5px" }}>
                    <Message msgRows={this.props.messages} />
                    <Help />
                    <Setting />
                    <LoginUser onLoginOff={this.props.onLoginOff} />
                </div>
            </Layout.Header>
        );
    }
}
