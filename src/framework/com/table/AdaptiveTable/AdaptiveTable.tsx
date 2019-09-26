import * as React from "react";
import { Table } from "antd";
import { IColumnSortDefine } from "../TableColumnBuilder";
import { TableColumnFactory } from "../TableColumnFactory";
import "../table.less";

//获取浏览器窗口大小
// const getViewportOffset = (): { w: number, h: number } => {
//   if (window.innerWidth) {
//     return {
//       w: window.innerWidth,
//       h: window.innerHeight
//     }
//   } else {
//     if (document.compatMode === 'BackCompat') {
//       return {
//         w: document.body.clientWidth,
//         h: document.body.clientHeight
//       }
//     } else {
//       return {
//         w: document.documentElement.clientWidth,
//         h: document.documentElement.clientHeight
//       }
//     }
//   }
// }

// 根据窗口大小计算table自适应高度
// const computerTableViewport = (dataSource: any[], dom: any): number | undefined => {

//   const headerHeight = 54;
//   const col = this.sta

//   // this.tableWrapEl.clientWidth, this.tableWrapEl.clientHeight

//   const viewport = getViewportOffset();
//   let height: number | undefined = undefined;
//   if (viewport && viewport.h && viewport.h > minusHeight) {
//     height = viewport.h - minusHeight;
//   }

//   if (height && height > dataSource.length * 54) {
//     height = undefined;
//   }

//   return {
//     width,
//     height
//   };
// }

interface IProps {
  dataSource: object[];
  columns: IColumnSortDefine[];
  minusHeight?: number;
  // scrollX?: number | string;
  onFilterChange?: (filters: any) => void;
  pageSize?: number;
  current?: number;
  total?: number;
  onShowSizeChange?: (current: number, size: number) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onSelectRows?: (selectedRows: any[]) => void;
}

interface IState {
  scroll: { x: string | number | undefined, y: number | undefined };
  columns: any[];
}

class AdaptiveTable extends React.Component<IProps, IState> {
  public state: IState;
  public tableWrapEl: any;
  public columnWidth: number = 0;
  private Factory = new TableColumnFactory();
  constructor(props: IProps) {
    super(props);
    const columns = this.Factory.createColumns(props.columns);
    columns.forEach(item => {
      this.columnWidth += item.width || 150;
    });
    // const scrollX = width > 1100 ? width : undefined;
    this.state = {
      scroll: { x: undefined, y: undefined },
      columns
    }
  }

  private reloadLayout = () => {

    const [headHeight, rowHeight] = [54, 54];
    const { columns, dataSource } = this.props;
    const wrapperEl = this.tableWrapEl;
    // const scrollX = this.state.scroll.x;
    // this.tableWrapEl.clientWidth, this.tableWrapEl.clientHeight
    const viewport = {
      w: wrapperEl.clientWidth,
      h: wrapperEl.clientHeight
    }

    const width = wrapperEl.clientWidth > this.columnWidth ? undefined : this.columnWidth;

    const height = 

    // const {height, width} = computerTableViewport(
    //   dataSource, 
    //   columns, 
    //   wrapperEl
    // );
    this.setState({ scroll: { x: width, y: height } });
  }

  private handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {

    if (filters.__operationColumn) {
      this.setState({ columns: this.Factory.GetCheckedColumns() })
    }

    const onFilterChange = this.props.onFilterChange;

    let filterArr = [];

    if (Object.getOwnPropertyNames(filters).length === 0 && sorter) {
      filterArr.push({
        fieldName: sorter.field,
        isAscSort: sorter.order === "ascend" ? true : false
      })
    } else {
      for (let key in filters) {
        let obj: any = {};
        if (filters[key].length > 0) {
          obj = { ...filters[key][0] }
        }
        if (sorter && sorter.field === key) {
          obj.isAscSort = sorter.order === "ascend" ? true : false
        }
        filterArr.push(obj);
      }
    }

    if (onFilterChange !== undefined) {
      onFilterChange(filterArr);
    }
  }

  componentDidMount() {
    // console.log(this.tableWrapEl.clientWidth, this.tableWrapEl.clientHeight)

    window.addEventListener("resize", this.reloadLayout);

    //props数据加载后，重新布局
    setTimeout(() => {
      this.reloadLayout();
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.reloadLayout);
  }

  render() {
    const { minusHeight, dataSource, current, pageSize, total, onShowSizeChange, onPageChange, onSelectRows } = this.props;

    const getRowSelection = (onSelectRows?: (selectedRows: any[]) => void) => {

      const columnWidth = 50;
      if (onSelectRows === undefined) {
        return undefined;
      }

      return {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          onSelectRows(selectedRows);
        },
        columnWidth
      }
    }

    return (
      <div className="qj-adaptive-table-wrapper" style={{}} ref={el => this.tableWrapEl = el}>
        <Table
          className="qj-adaptive-table"
          style={{ height: `calc(100vh - ${minusHeight}px)` }}
          bordered
          dataSource={dataSource}
          columns={this.state.columns}
          rowSelection={getRowSelection(onSelectRows)}
          onChange={this.handleChange}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            defaultCurrent: 1,
            current: current,
            pageSize: pageSize,
            total: total,
            onShowSizeChange: onShowSizeChange,
            onChange: onPageChange,
            showTotal: (total, range) => {
              return `显示${range[0]}-${range[1]}，每页显示 ${pageSize} 条`;
            }
          }}
          scroll={this.state.scroll} />
      </div>
    )
  }

}

export { AdaptiveTable };