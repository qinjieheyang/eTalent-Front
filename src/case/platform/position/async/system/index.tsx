import * as React from "react";
import { Radio, Table } from "antd";
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

interface IProps { }
export default class System extends CaseCommon.PageAsyncBase<IProps, IState, IService> {

  public state: IState = initState;

  constructor(props: IProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const { list, columns } = await this.service.showByPositionLevel();
    const newColumns = this.GetLevelColumns(columns);
    const newTableData = this.GetLevelData(list);
    console.log(JSON.stringify(newColumns))
    this.setState({
      columns: newColumns,
      tableData: newTableData
    })
  }

  public render() {
    const { showType, columns, tableData } = this.state;

    return (
      <div style={{ height: "100%", overflowY: "auto" }}>
        <Radio.Group value={showType} onChange={this.handleTypeChange} style={{ marginBottom: 16 }}>
          <Radio value="1">按职级</Radio>
          <Radio value="2">按职位</Radio>
        </Radio.Group>
        <Table className="qj-table-no-hover" columns={columns} dataSource={tableData} bordered pagination={false} />
      </div>
    )
  }

  private handleTypeChange = async (e: any) => {
    const showType = e.target.value;
    let newColumns: any[] = [];
    let newTableData: any[] = [];

    //按职级
    if (showType === "1") {
      const { list, columns } = await this.service.showByPositionLevel();
      newColumns = this.GetLevelColumns(columns);
      newTableData = this.GetLevelData(list);
    }

    //按职位
    if (showType === "2") {
      const { list, columns } = await this.service.showByPosition();
      newColumns = this.GetPositonColumns(columns);
      newTableData = this.GetPositionData(list);
    }

    this.setState({
      showType,
      columns: newColumns,
      tableData: newTableData
    })
  }

  private GetPositonColumns = (cols: Array<{ title: string; key: string }>): any[] => {
    return cols.map(col =>
      ({
        ...col,
        dataIndex: col.key,
        render: (cellValue: any, row: any) => {
          const obj = {
            children: cellValue,
            props: {}
          };
          const rowSpanStr = `${col.key}RowSpan`;
          if (row[rowSpanStr] >= 0) {
            obj.props["rowSpan"] = row[rowSpanStr] || 0;
          }
          return obj;
        }
      })
    )
  }

  private GetPositionData = (data: any[]): any[] => {
    return [];
  }

  private GetLevelColumns = (cols: any[]): any[] => {
    return [
      {
        title: "职级",
        key: "positionLevelName",
        dataIndex: "positionLevelName",
        width: 65
      },
      ...cols.map((col, index) =>
        ({
          ...col,
          dataIndex: col.key,
          children: [{ key: "Postion", name: "职位" }, { key: "Grade", name: "职等" }].map(item => {
            const key = `${col.key}${item.key}`;
            return {
              title: item.name,
              key: key,
              dataIndex: key,
              render: (cellValue: any, row: any) => {
                const obj = {
                  children: cellValue,
                  props: {}
                };
                const rowSpanStr = `${key}RowSpan`;
                if (row[rowSpanStr] >= 0) {
                  obj.props["rowSpan"] = row[rowSpanStr] || 0;
                }
                return obj;
              }
            }
          })
        })
      )
    ]
  }

  private GetLevelData = (list: any[]): any[] => {
    // return list.map((item, index) => {
    //   let _item = {
    //     positionLevelName: item.positionLevelName,
    //   };

    //   if(item.positionGroups instanceof Array){
    //     item.positionGroups.forEach((group, gIndex) => {
    //       _item["positionGroups_"]
    //     });
    //   }

    //   const 

    //   return {
    //     ...item,
    //     positionGroups_
    //   }

    //   return _item;
    // })
    return []
  }



}