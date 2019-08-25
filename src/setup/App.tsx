import moment from "moment";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalRedux from "src/globalRedux/GlobalRedux";
import PageLayout from "./layout/out/OutLayout";
import MainLayout from './layout/main/MainLayout';

// 集成Redux + Router + 统一后端日期格式转换
class App extends React.Component {
    public render() {
        return (
            <Provider store={GlobalRedux.globalStore}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/out" component={PageLayout} key="/out" />;
                        {/* 必须再下面，否则非严格模式下，只要URL包含"/"  ,  就自动路由到 ： MainLayout */}
                        <Route path="/" component={MainLayout} key="/" />;
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

// Dto传递到后端的统一日期格式转换
Date.prototype.toJSON = function() {
    return moment(this).format("YYYY-MM-DD HH:mm:ss");
};
