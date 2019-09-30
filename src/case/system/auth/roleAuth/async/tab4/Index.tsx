import * as React from "react";
import { Button } from "antd";
import Framework from 'src/framework/Framework';
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

import EditableFormTable from "./EditableFormTable"




interface IProps { }
export default class Group extends CaseCommon.PageAsyncBase<IProps, IState, IService> {

  public state: IState = initState;

  public checkedValues: any[];

  constructor(props: IProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const { pageSize, currentPage } = this.state;

    const { total, tableData } = await this.service.getAllPositionGroup({ pageSize, currentPage });

    this.setState({
      tableData,
      total
    })
  }


  public render() {
    return (
      <div style={{ height: "100%", padding: 16 }}>
        <Framework.Com.Buttons.Tool.LeftArea>
          <Button type="primary" onClick={this.handleSave}>保存</Button>
        </Framework.Com.Buttons.Tool.LeftArea>
        <div style={{ width: "100%", height: "calc(100% - 96px)", overflowY: "auto" }}>
          <EditableFormTable />
        </div>

      </div>
    )
  }



  private handleSave = () => {
    // this.setState({ visibleAdd: false });
    console.log(111)
  }

}