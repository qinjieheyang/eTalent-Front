import { Layout } from "antd";
import * as React from "react";

interface Props { }

export default class Sider extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Layout style={{height: "100%", background: "#fff"}}>
        {this.props.children}
      </Layout>
    );
  }

}
