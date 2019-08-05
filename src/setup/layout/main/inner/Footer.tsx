import { Layout } from "antd";
import * as React from "react";
import "./Footer.css";

export default class Footer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
 
    return (
      <Layout.Footer style={{borderTop:'1px solid #ddd'}}>
        版权所有2018-2019深圳勤杰科技有限公司 ICP备1Acc号-1
      </Layout.Footer>
    );
  }
}
