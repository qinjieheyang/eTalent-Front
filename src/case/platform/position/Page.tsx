import * as React from "react";
import { Tabs, Radio, Table } from "antd";
const { TabPane } = Tabs;

import CaseCommon from "src/caseCommon/CaseCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

const columns = [
  {
    title: '职级',
    key: 'level',
    dataIndex: 'level',
    width: 65
  },
  {
    title: '研发族',
    key: '1',
    children: [
      {
        title: '职位',
        dataIndex: 'key11',
        key: 'key11',
        render: (cellValue: any, row: any) => {
          const obj = {
            children: cellValue,
            props: {},
          };
          if(row.key11rowSpan >= 0){
            obj.props["rowSpan"] = row.key11rowSpan || 0;
          }
          return obj;
        },
      },
      {
        title: '职等',
        dataIndex: 'key12',
        key: 'key12',
      },
    ],
  },
  {
    title: '销售族',
    key: '2',
    children: [
      {
        title: '职位',
        dataIndex: 'key21',
        key: 'key21',
        render: (cellValue: any, row: any) => {
          const obj = {
            children: cellValue,
            props: {},
          };
          if(row['key21rowSpan'] >= 0){
            obj.props["rowSpan"] = row['key21rowSpan'] || 0;
          }
          return obj;
        },
      },
      {
        title: '职等',
        dataIndex: 'key22',
        key: 'key22',
        render: (cellValue: any, row: any) => {
          const obj = {
            children: cellValue,
            props: {},
          };
          if(row['key22rowSpan'] >= 0){
            obj.props["rowSpan"] = row['key22rowSpan'] || 0;
          }
          return obj;
        },
      },
    ],
  },
  {
    title: '实施族',
    key: '3',
    children: [
      {
        title: '职位',
        dataIndex: 'key31',
        key: 'key31',
      },
      {
        title: '职等',
        dataIndex: 'key32',
        key: 'key32',
      },
    ],
  },
  {
    title: '职能族',
    key: '4',
    children: [
      {
        title: '职位',
        dataIndex: 'key41',
        key: 'key41',
      },
      {
        title: '职等',
        dataIndex: 'key42',
        key: 'key42',
      },
    ],
  },
];

const data = [
  {
    level: 10,
    // key11: "xx",
    // key12: "xx",
    // key21: "xx",
    // key22: "xx",
    // key31: "xx",
    // key32: "xx",
    // key41: "xx",
    // key42: "xx",
    key: 10
  },
  {
    level: 9,
    key: 9,
    key11: "xx",
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 8,
    key: 8,
    key11: "xx",
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 7,
    key: 7,
    key11: "xx",
    key12: "xx",
    key21: "xx",
    key21rowSpan:2,
    key22: "xx",
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 6,
    key: 6,
    key11: "xx",
    key12: "xx",
    key21: "xx",
    key21rowSpan:0,
    key22: "xx",
    key22rowSpan:4,
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 5,
    key: 5,
    key11: "xx",
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key22rowSpan:0,
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 4,
    key: 4,
    key11: "xx",
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key22rowSpan:0,
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 3,
    key: 3,
    key11: "xx",
    key11rowSpan: 3,
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key22rowSpan:0,
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 2,
    key: 2,
    key11rowSpan: 0,
    // key11: "xx",
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
  {
    level: 1,
    key: 1,
    key11rowSpan: 0,
    // key11: "xx",
    key12: "xx",
    key21: "xx",
    key22: "xx",
    key31: "xx",
    key32: "xx",
    key41: "xx",
    key42: "xx",
  },
]

interface IPageProps { }
export default class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {

  }

  public render() {
    return (
      <div className="qj-content">
        <Tabs size="large" animated={false} defaultActiveKey="1">
          <TabPane tab="职位体系" key="1">
            <Radio.Group defaultValue={1} style={{ marginLeft: 24 }} onChange={this.handlePositionTypeChange}>
              <Radio value={1}>按职级</Radio>
              <Radio value={2}>按职位</Radio>
            </Radio.Group>
            <Table style={{ margin: 16 }} columns={columns} dataSource={data} bordered pagination={false}/>
          </TabPane>
          <TabPane tab="职位族设置" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="职位设置" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="职级设置" key="4">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="职等设置" key="5">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }

  handlePositionTypeChange = (value: number) => {
      console.log(value)
  }
}
