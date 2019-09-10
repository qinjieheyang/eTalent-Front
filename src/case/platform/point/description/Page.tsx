import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import {Const} from "./Const";
import {Service} from "./Service";
import {IService, ServiceMock} from "./ServiceMock";
import { initState, IState } from "./State";

import Content from "./inner/Content";

import "./Style.less";

interface IPageProps extends GlobalRedux.Actions.IGlobalActionDispatcher, RouteComponentProps {}

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  private showAll: boolean = false; //显示封存

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init(){
    const treeData = await this.service.getInit();
    
    const tableData = await this.service.getTableDate();
    
    this.setState({treeData, tableData});
    // console.log(treeData,333)
  }
  
  public render() {
    return (
      <CaseCommon.PageLayout>
        <CaseCommon.PageSide>
          <OrgTree showAll={this.showAll}  onShowChange={this.onShowChange} treeData={this.state.treeData}/>
        </CaseCommon.PageSide>
        <CaseCommon.PageContent>
          <Content dataSource={this.state.tableData}/>
        </CaseCommon.PageContent>
      </CaseCommon.PageLayout>
    );
  }



  private onShowChange = (checked: boolean)=>{
    
  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)