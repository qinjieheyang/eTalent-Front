import { Layout } from "antd";
import * as React from "react";
import * as Framework from "src/framework/Framework";

import { IMessageRow } from "../State";
import TopMenu from "./headerInner/TopMenu";
import Help from "./headerInner/Help";
import LoginUser from "./headerInner/LoginUser";
import Message from "./headerInner/Message";
import Setting from "./headerInner/Setting";
import { Link } from 'react-router-dom';

import "./Header.less";

interface IHeaderProps {
    onLoginOff: () => void;
    onMenuChange:(routePath:string) => void;
    messages: IMessageRow[];
    topRegs: Framework.Case.Reg[];
    topUrl: string;
    logoCollapsed: boolean;
}

export default class Header extends React.Component<IHeaderProps> {
    constructor(props: IHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <Layout.Header className={["qj-header",this.props.logoCollapsed?"qj-header-collapsed":""].join(' ')}>
                <div className="qj-logo">
                    <Link to={"/"} onClick={() => this.props.onMenuChange('/')}>
                        <img src={this.props.logoCollapsed?"/img/logo-collapsed.png":"/img/logo.png"} className="qj-logo-img" />
                    </Link>
                </div>
                <div className="qj-header-center">
                    <TopMenu topRegs={this.props.topRegs} topUrl={this.props.topUrl} onMenuChange={this.props.onMenuChange}/>
                </div>
                <div className="qj-header-right" style={{ position: "absolute", right:0, top:0, padding: "5px 25px 5px 5px" }}>
                    <Message msgRows={this.props.messages} />
                    <Help />
                    <Setting />
                    <LoginUser onLoginOff={this.props.onLoginOff} />
                </div>
            </Layout.Header>
        );
    }
}
