import * as React from "react";
import { Spin } from "antd";
/** 延迟加载提示组件 */
export default function LoadingComponent(props: any) {
    let style = {
        zIndex: 100, 
        display: 'flex',
        width:'100%',
        height:'100%',
        alignContent: 'stretch',
        justifyContent:'center',
    }
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
        // return <div>Loading...</div>;
        return (
            <div style={style}>
                <Spin spinning={true}>
                <div style={{width:'100%',height:'100%'}}></div>
                </Spin>
            </div>
        )
    } else {
        return null;
    }
}
