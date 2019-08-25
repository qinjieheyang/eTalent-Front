import React from "react";

const DepartTableColumns: Array<any> = [
  {
    title: '机构名称',
    // width: 150,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '封存',
    // width: 100,
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '机构编码',
    dataIndex: 'address',
    key: '1',
    // width: 150,
  },
  // {
  //   title: '机构类型',
  //   dataIndex: 'address2',
  //   key: '2',
  //   // width: 150,
  // },
  // {
  //   title: '上级机构',
  //   dataIndex: 'address',
  //   key: '3',
  //   // width: 150,
  // },
  // {
  //   title: '部门负责人',
  //   dataIndex: 'address',
  //   key: '4',
  //   // width: 150,
  // },
  // {
  //   title: '机构全称',
  //   dataIndex: 'address',
  //   key: '5',
  //   // width: 150,
  // },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 150,
    render: () => <a href="javascript:;">action</a>,
  },
];


export default DepartTableColumns;