import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { pageRegs } from "src/case/OutRegs";
import NoMatch from "src/setup/NoMatch";
import PagesHeader from "./OutHeader";

const routes = pageRegs.getRoutes();

/** 页面布局 */
export default class PageLayout extends React.Component {
    public componentDidMount() {
        document.body.style.overflow = "unset";
    }
    public render() {
        const { classes, ...rest } = this.props as any;
        return (
            <div id="PageLayout" style={{ height: "100%" }}>
                <PagesHeader {...rest} />
                {/* OutLayout */}
                <div id="PageLayout2" style={{ height: "100%" }}>
                    <Switch>
                        {routes}
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        );
    }
}
