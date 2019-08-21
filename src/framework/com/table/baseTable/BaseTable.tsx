import { Table, Tag } from "antd";

import * as React from "react";

import TableColumnBuilder from "../TableColumnBuilder";

import { IColumnDefine } from "../tableColumns/IColumnDefine";

interface ISearchKey {
  key: string;
  title: string;
  text: string;
}

export interface ITableBaseProps {
  dataSource: any[];
  columns: IColumnDefine[];
  onSearchTabClose?: (tagKey: string) => void;
  onChangeSearchKeys?: (searchKeys: ISearchKey[]) => void;
  pagination?: any;
  scroll?: { x: number | true, y: number  }

}

export class TableBase extends React.Component<ITableBaseProps> {

  public constructor(props: ITableBaseProps) {
      super(props);
  }

  public render = () => {
     const props = this.props;

    return (
      <div>
        <div className="qj-table-search-wrapper">
          <Tag color="magenta" closable onClose={(key: string) => props.onSearchTabClose(key)}>名称:test</Tag>
        </div>
        <Table 
          dataSource={props.dataSource}
          columns={props.columns}
          pagination={props.pagination || false}
        />;
      </div>
    )
  }
}