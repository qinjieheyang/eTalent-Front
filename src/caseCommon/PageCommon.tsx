import * as React from "react";
import { Layout, Card } from "antd";

const PageLayout = (props: any) => {
  return (
    <Layout style={{ height: "100%" }}>
      {props.children}
    </Layout>
  )
}

const PageSide = (props: any) => {

  const style = {
    background: '#fff',
    height: "100%",
    borderRight: "1px solid #e8e8e8"
  }

  return (
    <Layout.Sider className="qj-depart-side" style={style} width={216}>
      {props.children}
    </Layout.Sider>
  )
}

const PageContent = (props: any) => {

  return (
    <Layout>
      <Layout.Content style={{ margin: 16 }}>
        {props.children}
      </Layout.Content>
    </Layout>
  )
}

const PageCard = (props: any) => {

  const getTitle = () => {
    const { title } = props;

    return title === undefined ? null : {
      title: <div className="qj-page-card-title-btn-warpper">{title}</div>
    };
  }

  return (
    <Card
      className="qj-page-card"
      bodyStyle={{ padding: 16, height: "calc(100vh - 96px)", overflow: "hidden" }}
      bordered={false}
      {...getTitle()}
    >
      {props.children}
    </Card>
  )
}

export { PageLayout, PageSide, PageContent, PageCard };

const PageCommon = { PageLayout, PageSide, PageContent, PageCard }

export default PageCommon;
