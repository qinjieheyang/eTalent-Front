import * as React from "react";
import { PageLayout, PageCard, PageContent } from "src/caseCommon/PageCommon";
import Framework from "src/framework/Framework";
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;


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
          <PageCard title="注册用户">
              <AdaptiveTable
                columns={columns}
                dataSource={dataSource}
                minusHeight={199}
              />
          </PageCard>
        </PageContent>
      </PageLayout>
    );
  }
}
