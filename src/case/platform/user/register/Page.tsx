import * as React from "react";
// import { Tabs } from "antd";
import PageCommon, { PageLayout, PageContent } from "src/caseCommon/PageCommon";
import Framework from "src/framework/Framework";
// import CaseCommon from 'src/caseCommon/CaseCommon';
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

// const { TabPane } = Tabs;

export default class Page extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {

    const columns = [
      {
        title: '用户名',
        key: 'name',
        dataIndex: 'name',
        width: 150,
        enableSearch: true
      },
      {
        title: '企业名称',
        key: '1',
        dataIndex: 'name',
        width: 150,
        enableSearch: true
      },
      {
        title: '邮箱',
        key: '2',
        dataIndex: 'name',
        width: 150,
        enableSearch: true
      },
      {
        title: '手机号',
        key: '3',
        dataIndex: 'name',
        width: 150,
        enableSearch: true
      },
      {
        title: '注册日期',
        key: '4',
        dataIndex: 'name',
        width: 150,
        enableSearch: true
      },
    ]
    const dataSource: any = [
      {
        name: "xxxx"
      },
      {
        name: "xxxx"
      },
      {
        name: "xxxx"
      },
      {
        name: "xxxx"
      },
    ];
    return (
      <PageLayout>
        <PageContent>
          <PageCommon.PageCard title="用户注册">
            <AdaptiveTable
              columns={columns}
              dataSource={dataSource}
              minusHeight={215}
            />
          </PageCommon.PageCard>
        </PageContent>
      </PageLayout>
    );
  }
}
