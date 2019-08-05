import { Spin } from "antd";
import * as React from "react";

export default class PageLoader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    let style = {
      zIndex: 100, 
      display: 'flex',
      width:'100%',
      height:'100%',
      alignContent: 'stretch',
      justifyContent:'center',
    }
    return (
      <div style={style}>
        <Spin spinning={true}>
          <div style={{width:'100%',height:'100%'}}></div>
        </Spin>
      </div>
    );
  }
}
