/** 后端调用等待处理器 */
export class HttpRequestWaitHandler {
    public static ActionTypeRequestStart = "Http/RequestStart";
    public static ActionTypeRequestEnd = "Http/RequestEnd";

    private reduxStore: any = null;

    public constructor(store: any) {
        this.reduxStore = store;
    }

    public Start = () => {
        if (this.reduxStore == null) {
            return;
        }
        this.reduxStore.dispatch({ type: HttpRequestWaitHandler.ActionTypeRequestStart });
    };

    public End = () => {
        if (this.reduxStore == null) {
            return;
        }
        this.reduxStore.dispatch({ type: HttpRequestWaitHandler.ActionTypeRequestEnd });
    };
}
