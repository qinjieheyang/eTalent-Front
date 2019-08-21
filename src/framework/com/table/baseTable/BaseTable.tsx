import { Table, Tag } from "antd";

import * as React from "react";

import {TableColumnBuilder} from "../TableColumnBuilder";

import { IColumnDefine } from "../tableColumns/IColumnDefine";

interface ISearchKey {
  key: string;
  title: string;
  text: string;
}

export interface ITableBaseProps {
  dataSource: any[];
  columns: IColumnDefine[];
  pagination?: any;
  scroll?: { x: number|string|undefined, y: number|string|undefined };
  defaultSearchKeys?: ISearchKey[];
  onSearchTabClose?: (tagKey: string) => void;
  onChangeSearchKeys?: (searchKeys: ISearchKey[]) => void;

}

export class TableBase extends React.Component<ITableBaseProps> {

  private searchKeys: ISearchKey[] = [];


  public constructor(props: ITableBaseProps) {
      super(props);
      this.searchKeys = props.defaultSearchKeys || [];

  }

  public render = () => {
     const props = this.props;

    return (
      <div>
        {this.getTagsBySearchKeys()}
        <Table 
          dataSource={props.dataSource}
          columns={this.getColumns()}
          pagination={props.pagination || false}
        />;
      </div>
    )
  }

  private handleTabClose = (key: string) => {
    // this.props.onSearchTabClose(key);
    if(this.props.onChangeSearchKeys){
      this.props.onChangeSearchKeys(this.searchKeys);
    }

  }

  private getTagsBySearchKeys = () =>{
    return (
      <div className="qj-table-search-wrapper">
        {
          this.searchKeys.map((searchItem:ISearchKey) => (
            <Tag color="magenta" closable onClose={() => this.handleTabClose(searchItem.key)}>
              {`${searchItem.title}:${searchItem.text}`}
            </Tag>
          ))
        }
      </div>
    )
  }

  private getColumns = () => {
    // const columns = this.props.columns;
    const builder = new TableColumnBuilder();
    for(const col of this.props.columns){
      switch(col.filedType){
        case "text":
          //todo
          break;
        default: 
          builder.AddText(col.title, col.dataIndex);
      }
    }


    return builder.GetColumns();
  }
}