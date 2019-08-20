import React from 'react';
import { Spin } from "antd";

const PageLoading = () =>　{
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

export default PageLoading;