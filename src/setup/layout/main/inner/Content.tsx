import { Layout } from "antd";
import * as React from "react";
import PageLoader from "./PageLoader";
import PageWrapper from "./PageWrapper";


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
    let {isWaitHttpRequest} = this.props;
    // isWaitHttpRequest = true;
    return (
      <Layout.Content
        id="Layout.Content"
        style={{
          height: "calc(100vh - 64px)",
          minHeight: 280,
          overflow: "hidden",
          flex: "none"
        }}
      >
        {
          isWaitHttpRequest?<PageLoader />:<PageWrapper page={this.props.children} />
        }
      </Layout.Content>
    );
  }
}
