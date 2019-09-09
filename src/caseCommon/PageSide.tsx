import { Layout } from "antd";
import * as React from "react";

const style = {
  background: '#fff',
  height: "100%",
  borderRight: "1px solid #e8e8e8"
}


interface Props { }

export default class PageSide extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Layout.Sider className="qj-depart-side" style={style} width={216}>
        {this.props.children}
      </Layout.Sider>
    );
  }


}
