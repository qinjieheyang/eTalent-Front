import { Layout, Spin } from "antd";
import * as React from "react";


interface IContentProps {
  isWaitHttpRequest: boolean;
}

export default class Content extends React.Component<IContentProps> {
  constructor(props: IContentProps) {
    super(props);
  }

  public ini(): void {}

  public render() {
    // if (CF.isCurrentUserLogin() === false) {
    //   return <Redirect to={{ pathname: "/page/login" }} />;
    // }

    return (
      <Layout.Content
        id="Layout.Content"
        style={{
          margin: "24px 16px",
          height: "100%",
          minHeight: 280
        }}
      >
        <Spin spinning={this.props.isWaitHttpRequest}>


        
          {this.props.children}
        </Spin>
      </Layout.Content>
    );
  }
}
