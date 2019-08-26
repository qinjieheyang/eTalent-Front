import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { IColumnSortDefine } from "../TableColumnBuilder";
import { TableColumnFactory } from "../TableColumnFactory";


const Factory = new TableColumnFactory();

//获取浏览器窗口大小
const getViewportOffset = (): { w: number, h: number } => {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight
      }
    } else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
  }
}

// 根据窗口大小计算table自适应高度
const computerTableHeightByViewport = (dataSource: Array<any>, minusHeight: number = 0): number | undefined => {
  const viewport = getViewportOffset();
  let height: number | undefined = undefined;
  if (viewport && viewport.h && viewport.h > minusHeight) {
    height = viewport.h - minusHeight;
  }

  if (height && height > dataSource.length * 54) {
    height = undefined;
  }

  return height;
}

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

interface IAdaptiveTableProps {
  dataSource: object[],
  columns: IColumnSortDefine[],
  minusHeight?: number
}

const AdaptiveTable = (props: IAdaptiveTableProps) => {

  const { dataSource, minusHeight = 0 } = props;

  const [columns, setColumns] = useState(Factory.createColumns(props.columns));

  const [scroll, setScroll] = useState<{ x: string | undefined, y: number | undefined }>({ x: undefined, y: computerTableHeightByViewport(dataSource, minusHeight+54) });

  useEffect(() => {
    const reloadLayout = () => {
      const height: number | undefined = computerTableHeightByViewport(dataSource, minusHeight+54);
      setScroll({ x: scroll.x, y: height });
    }

    window.addEventListener("resize", reloadLayout);

    return () => {
      window.removeEventListener("resize", reloadLayout);
    }
  })

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    if (filters.__operationColumn) {
      setColumns(Factory.GetCheckedColumns())
    }
  }

  return (
    <Table
      className="qj-depart-table"
      style = {{height: `calc(100vh - ${minusHeight}px)`}}
      bordered
      dataSource={dataSource}
      columns={columns}
      rowSelection={rowSelection}
      onChange={handleChange}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultCurrent: 1,
        total: 500,
        showTotal: (total, range) => `显示${range[0]}-${range[1]}，每页显示 ${total} 条`
      }}
      scroll={scroll} />
  )

}

export { AdaptiveTable };