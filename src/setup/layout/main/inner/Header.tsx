import React, { useState } from "react";
import { Layout } from "antd";
import * as Framework from "src/framework/Framework";

import { IMessageRow } from "../State";
// import Logo from "./headerInner/Logo";
import TopMenu from "./headerInner/TopMenu";
import Help from "./headerInner/Help";
import LoginUser from "./headerInner/LoginUser";
import Message from "./headerInner/Message";
import Setting from "./headerInner/Setting";
import { Link, Redirect } from 'react-router-dom';

import "./Header.less";

interface IHeaderProps {
    onMenuChange:(routePath:string) => void;
    messages: IMessageRow[];
    topUrl: string;
}

const Header = (props: IHeaderProps) => {
    const [isLogin, setLogin] = useState<boolean>(Framework.CurrentUser.isLogin);

    if (isLogin === false) {
        return <Redirect to={{ pathname: "/out/login" }} />;
    }

    const handleLoginOff = () => {
        // debugger;
        Framework.CurrentUser.off();
        setLogin(false);
    };

    const {onMenuChange, topUrl, messages} = props;


    return (
        <Layout.Header id="topHeader" className="qj-header">
                {/* <Logo onClick={() => this.props.onMenuChange('/')}/> */}
                <div className="qj-logo">
                    <Link to={"/"} onClick={() => onMenuChange('/')}>
                        <img src="/img/logo.png" className="qj-logo-img" id="logo-img"/>
                    </Link>
                </div>
                <div className="qj-header-center">
                    <TopMenu topUrl={topUrl} onMenuChange={onMenuChange}/>
                </div>
                <div className="qj-header-right">
                    <Message msgRows={messages} />
                    <Help />
                    <Setting />
                    <LoginUser onLoginOff={handleLoginOff} />
                </div>
            </Layout.Header>
    )
}

export default Header;