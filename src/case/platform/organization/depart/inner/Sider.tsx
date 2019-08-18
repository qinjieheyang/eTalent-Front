import { Layout, Switch } from "antd";
import * as React from "react";

import DepartTree from "./sideInner/DepartTree";

interface ISiderProps {
  showAll: boolean; //显示封存
  treeData: any;
  onShowChange: (checked: boolean) => void;
}

export default class Sider extends React.Component<ISiderProps> {

  constructor(props: ISiderProps) {
    super(props);
  }

  public render() {
    const {showAll, onShowChange, treeData} = this.props;
    return (
      <Layout.Sider className="qj-depart-side" style={{ background: '#fff' }} width={216}>
        <div className="qj-depart-side-box">
          <div className="qj-depart-side-title">
            <span>显示封存：</span>
            <Switch checked={showAll} onChange={onShowChange} />
          </div>
          {
            treeData.length?<DepartTree treeData={treeData} showAll={showAll}/>:null
          }
        </div>
      </Layout.Sider>
    );
  }

  
}
