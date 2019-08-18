// import "antd/dist/antd.less";

import * as React from "react";
import * as ReactDOM from "react-dom";
// import "./styles/global.less";
import "./index.less";
import App from "./setup/App";

const root = document.getElementById("app") as HTMLElement;

ReactDOM.render(<App />, root);
