import React,{ Fragment, useState, useEffect  } from "react";
import {  Table, Pagination  } from "antd";

import DepartTableColumns from './DepartTableColumns';

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    console.log(selected, selectedRows, changeRows);
  },
};

//获取浏览器窗口大小
const getViewportOffset = (): {w:number,h:number} => {
  if(window.innerWidth){
      return{
          w:window.innerWidth,
          h:window.innerHeight
      }
  }else{
      if(document.compatMode==='BackCompat'){
          return{
              w:document.body.clientWidth,
              h:document.body.clientHeight
          }
      }else{
          return{
              w:document.documentElement.clientWidth,
              h:document.documentElement.clientHeight
          }
      }
  }
}

// 根据窗口大小计算table自适应高度
const computerTableHeightByViewport = (dataSource: Array<any>): number|undefined =>{
  const viewport = getViewportOffset();
  let height: number|undefined = undefined;
  if(viewport && viewport.h && viewport.h>318){
    height =  viewport.h - 318;
  }

  if(height && height > dataSource.length*54){
    height = undefined;
  }

  return height;
}




interface IDepartTableProps {
  dataSource: Array<any>,
}

const DepartTable = (props: IDepartTableProps) => {
  const {dataSource} = props;

  const [scroll, setScroll] = useState<{x:string,y:number|undefined}>({ x: '130%', y: computerTableHeightByViewport(dataSource) });
  
  useEffect(()=>{
    const reloadLayout = () => {
      const height:number|undefined = computerTableHeightByViewport(dataSource);
      setScroll({x:scroll.x, y: height});
    }
  
    window.addEventListener("resize", reloadLayout);

    return ()=>{
      window.removeEventListener("resize", reloadLayout);
    }
  })
  
  return (
    <Fragment>
      <Table
        className="qj-depart-table"
        columns={DepartTableColumns}
        rowSelection={rowSelection}
        dataSource={props.dataSource}
        // onChange={this.onChange}
        pagination={false}
        scroll={scroll}
      />
      <Pagination 
        showQuickJumper 
        showSizeChanger 
        defaultCurrent={1} 
        total={500} 
        style={{
          paddingRight:16
        }}
        showTotal={
          (total, range) => `显示${range[0]}-${range[1]}，每页显示 ${total} 条`
        }
      />
    </Fragment>
  )
}

export default DepartTable;