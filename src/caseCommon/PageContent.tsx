import { Layout } from "antd";
import * as React from "react";

const PageContent = (props: any) => {
  return (
    <Layout>
        <Layout.Content style={{ margin: 16, marginBottom: 0 }}>
          {props.children}
        </Layout.Content>
      </Layout>
  )
}

export default PageContent;