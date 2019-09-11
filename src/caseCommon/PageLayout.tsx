import { Layout } from "antd";
import * as React from "react";

const PageLayout = (props: any) => {
  return (
    <Layout style={{height: "100%"}}>
        {props.children}
      </Layout>
  )
}

export default PageLayout;
