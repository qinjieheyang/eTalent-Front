import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.less";
import App from "./setup/App";

const root = document.getElementById("app") as HTMLElement;

ReactDOM.render(<App />, root);
