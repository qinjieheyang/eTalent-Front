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

interface IHeaderProps {
    onLoginOff: () => void;
    onMenuChange:(routePath:string) => void;
    messages: IMessageRow[];
    topRegs: Framework.Case.Reg[];
    topUrl: string;
}

export default class Header extends React.Component<IHeaderProps> {
    constructor(props: IHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <Layout.Header style={{ background: "#fff", padding: 0 }}>
                <div style={{float:"left",background:"#001529"}}>
                    <Link to={"/"} onClick={() => this.props.onMenuChange('/')}>
                        <img src="/img/logo.png" style={{width:200,height:64}}/>
                    </Link>
                </div>
                <div style={{marginLeft:200, marginRight:300, padding: "5px 25px 5px 5px"}}>
                    <TopMenu topRegs={this.props.topRegs} topUrl={this.props.topUrl} onMenuChange={this.props.onMenuChange}/>
                </div>
                <div style={{ position: "absolute", right:0, top:0, padding: "5px 25px 5px 5px" }}>
                    <Message msgRows={this.props.messages} />
                    <Help />
                    <Setting />
                    <LoginUser onLoginOff={this.props.onLoginOff} />
                </div>
            </Layout.Header>
        );
    }
}
