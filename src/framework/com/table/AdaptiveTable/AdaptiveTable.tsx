import * as React from "react";
import { Table } from "antd";
import { IColumnSortDefine } from "../TableColumnBuilder";
import { TableColumnFactory } from "../TableColumnFactory";
import "../table.less";

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
const computerTableHeightByViewport = (dataSource: any[], minusHeight: number): number | undefined => {
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

interface IProps {
  dataSource: object[];
  columns: IColumnSortDefine[];
  minusHeight?: number;
  scrollX?: number | string;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
}

interface IState {
  scroll: { x: string | number | undefined, y: number | undefined };
  columns: any[];
}

class AdaptiveTable extends React.Component<IProps, IState> {
  public state: IState;
  private Factory = new TableColumnFactory();

  constructor(props: IProps) {
    super(props);
    this.state = {
      scroll: { x: undefined, y: undefined },
      columns: this.Factory.createColumns(props.columns)
    }
  }

  private reloadLayout = () => {
    const { minusHeight = 0, dataSource, scrollX = undefined } = this.props;
    const height: number | undefined = computerTableHeightByViewport(dataSource, minusHeight + 54);
    this.setState({ scroll: { x: scrollX, y: height } });
  }

  private handleChange = (pagination: any, filters: any, sorter: any) => {
    if (filters.__operationColumn) {
      this.setState({ columns: this.Factory.GetCheckedColumns() })
    }
    const onChange = this.props.onChange;
    if (onChange !== undefined) {
      onChange(pagination, filters, sorter);
    }
  }

  componentDidMount() {
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
    const { minusHeight, dataSource } = this.props;
    return <Table
      className="qj-adaptive-table"
      style={{ height: `calc(100vh - ${minusHeight}px)`}}
      bordered
      dataSource={dataSource}
      columns={this.state.columns}
      rowSelection={rowSelection}
      onChange={this.handleChange}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        defaultCurrent: 1,
        total: 500,
        showTotal: (total, range) => `显示${range[0]}-${range[1]}，每页显示 ${total} 条`
      }}
      scroll={this.state.scroll} />
  }

}

export { AdaptiveTable };