import * as React from "react";
import { Layout } from "antd";
import { RouteComponentProps } from "react-router-dom";
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon from "src/caseCommon/CaseCommon";
import {Const} from "./Const";
import {Service} from "./Service";
import {IService, ServiceMock} from "./ServiceMock";
import { initState, IState } from "./State";

import Sider from "./inner/Sider";
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

  }
  
  public render() {
    // const treeData = this.state.treeData;
    // console.log(this.props.globalState.isWaitHttpRequest)
    return (
      <Layout className="qj-depart-wrapper">
        <Sider showAll={this.showAll} treeData={this.state.treeData} onShowChange={this.onShowChange} />
        <Layout>
          <Content dataSource={this.state.tableData}/>
        </Layout>
      </Layout>
    );
  }



  private onShowChange = (checked: boolean)=>{
    
  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)