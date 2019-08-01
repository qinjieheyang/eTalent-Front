import * as React from "react";
/** 延迟加载提示组件 */
export default function LoadingComponent(props: any) {
    if (props.error) {
        return (
            <div>
                Error! <button onClick={props.retry}>Retry</button>
            </div>
        );
    } else if (props.timedOut) {
        return (
            <div>
                Taking a long time... <button onClick={props.retry}>Retry</button>
            </div>
        );
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}
