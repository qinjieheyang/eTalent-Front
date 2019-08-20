import * as React from "react";

import { Layout } from "antd";

import CaseCommon from "src/caseCommon/CaseCommon";
import {Const} from "./Const";
import {Service} from "./Service";
import {IService, ServiceMock} from "./ServiceMock";
import { initState, IState } from "./State";

import Sider from "./inner/Sider";
import Content from "./inner/Content";

import "./Style.less";

interface IPageProps {}

export default class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  private showAll: boolean = true; //显示封存

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init(){
    const treeData = await this.service.getInit();
    this.setState({treeData});
  }
  
  public render() {
    // const treeData = this.state.treeData;
    
    return (
      <Layout className="qj-depart-wrapper">
        <Sider showAll={this.showAll} treeData={this.state.treeData} onShowChange={this.onShowChange} />
        <Layout>
          <Content />
        </Layout>
      </Layout>
    );
  }



  private onShowChange = (checked: boolean)=>{
    
  }

}
