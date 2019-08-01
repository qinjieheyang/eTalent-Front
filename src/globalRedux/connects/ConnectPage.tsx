import React from "react";
import { connect } from "react-redux";
import {
    createGlobalMapDispatchToPropsFunc,
    createGlobalMapStateToPropsFunc,
    createMapCodeTableStateToProps
} from "./createReduxMapFunc";
class ConnectPageClass {
    /** 连接到全局State和Redux动作发布器 */
    public ConnectGlobal(Page: React.ComponentType) {
        const mapStateToProps = createGlobalMapStateToPropsFunc();
        const mapDispatchToProps = createGlobalMapDispatchToPropsFunc();
        return connect(
            mapStateToProps,
            mapDispatchToProps
        )(Page);
    }

    /** 连接到全局State */
    public ConnectGlobalStateOnly(Page: React.ComponentType) {
        const mapStateToProps = createGlobalMapStateToPropsFunc();
        return connect(mapStateToProps)(Page);
    }

    /** 连接到全局CodeTables */
    public ConnectGlobalCodeTables(Page: React.ComponentType) {
        const mapStateToProps = createMapCodeTableStateToProps();
        return connect(mapStateToProps)(Page);
    }

    public NotConnect(Page: React.ComponentType) {
        return Page;
    }
}

export const ConnectPage = new ConnectPageClass();
