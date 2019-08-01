import * as Actions from "./actions/Index";
import { ConnectPage } from "./connects/Index";
import * as States from "./states/Index";
import { globalStore } from "./Store";
export { Actions, ConnectPage, States, globalStore };

const GlobalRedux = { Actions, ConnectPage, States, globalStore };

export default GlobalRedux;
