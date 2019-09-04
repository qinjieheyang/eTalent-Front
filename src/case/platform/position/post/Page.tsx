import * as React from "react";
import { Tabs  } from "antd";
const { TabPane } = Tabs;

import CaseCommon from "src/caseCommon/CaseCommon";
import {Const} from "./Const";
import {Service} from "./Service";
import {IService, ServiceMock} from "./ServiceMock";
import { IState } from "./State";

interface IPageProps {}
export default class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init(){
    
  }
 
  public render() {
    return (
      <div className="qj-content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="职位体系" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="职位族设置" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="职位设置" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="职级设置" key="4">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="职等设置" key="5">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
