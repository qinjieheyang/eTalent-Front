import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduxReducer } from "./reducers/reduxReducer";
import { globalIniState } from "./states/GlobalState";

const thunk = (store: any) => {
    return (next: any) => {
        return (action: any) => {
            if (typeof action === "function") {
                return action(store.dispatch, store.getState);
            }
            return next(action);
        };
    };
};

export const globalStore = createStore(reduxReducer, globalIniState, composeWithDevTools(applyMiddleware(thunk)));
