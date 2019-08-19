import React from "react";
import { Layout } from "antd";
import * as Framework from "src/framework/Framework";

import { IMessageRow } from "../State";
// import Logo from "./headerInner/Logo";
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
    beforeThemeChange: () => void;
    afterThemeChange: () => void;
    messages: IMessageRow[];
    topRegs: Framework.Case.Reg[];
    topUrl: string;
}

const Header = (props: IHeaderProps) => {

    const {onMenuChange, topRegs, topUrl, messages, beforeThemeChange, afterThemeChange, onLoginOff} = props;

    return (
        <Layout.Header id="topHeader" className="qj-header">
                {/* <Logo onClick={() => this.props.onMenuChange('/')}/> */}
                <div className="qj-logo">
                    <Link to={"/"} onClick={() => onMenuChange('/')}>
                        <img src="/img/logo.png" className="qj-logo-img" id="logo-img"/>
                    </Link>
                </div>
                <div className="qj-header-center">
                    <TopMenu topRegs={topRegs} topUrl={topUrl} onMenuChange={onMenuChange}/>
                </div>
                <div className="qj-header-right">
                    <Message msgRows={messages} />
                    <Help />
                    <Setting beforeThemeChange={beforeThemeChange} afterThemeChange={afterThemeChange} />
                    <LoginUser onLoginOff={onLoginOff} />
                </div>
            </Layout.Header>
    )
}

export default Header;