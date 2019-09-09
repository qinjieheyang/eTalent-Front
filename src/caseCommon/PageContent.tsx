import { Layout } from "antd";
import * as React from "react";

interface Props { }

export default class PageContent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Layout>
        <Layout.Content style={{ background: "#fff" }}>
          {this.props.children}
        </Layout.Content>
      </Layout>
    );
  }

}
