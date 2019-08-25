import React from "react";
import Framework from "src/framework/Framework";
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

import DepartTableColumns from './DepartTableColumns';


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    switch: false,
    bool: true,
    date: "2019-10-30",
    type: "1",
    orgName: "某某集团"
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    switch: true,
    bool: false,
    date: "2019-5-30",
    type: "3",
    orgName: "莫某单位"
  },
];

const columns = [{
  title: "姓名",
  key: "name",
  dataIndex: "name",
  dataType: "text",
}, {
  title: "年龄",
  key: "age",
  dataIndex: "age",
  dataType: "number",
}]

interface IDepartTableProps {
  dataSource: Array<any>,
}

const DepartTable = (props: IDepartTableProps) => {
  
  return (
    <AdaptiveTable
      columns={columns}
      dataSource={dataSource}
    />
  )
}

export default DepartTable;