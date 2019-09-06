// import React from "react";

const DepartTableColumns: Array<any> = [
  {
    title: '封存',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    enableSearch: true
  },
  {
    title: '历任',
    key: 'name',
    dataIndex: 'name',
    width: 150,
    enableSearch: true
  }, 
  {
    title: '岗位编码',
    dataIndex: 'address',
    key: '1',
    width: 120,
    enableSearch: true
  },
  {
    title: '岗位名称',
    dataIndex: 'address',
    key: '2',
    width: 150,
    enableSearch: true
  },
  {
    title: '所属部门',
    dataIndex: 'address',
    key: '3',
    width: 150,
    enableSearch: true
  },
  {
    title: '职位名称',
    dataIndex: 'address',
    key: '4',
    width: 150,
    enableSearch: true
  },
  {
    title: '职级',
    dataIndex: 'address',
    key: '5',
    enableSearch: true
    // width: 150,
  },
  {
    title: '职等',
    dataIndex: 'address',
    key: '6',
    enableSearch: true
    // width: 150,
  },
  {
    title: '上级岗位',
    dataIndex: 'address',
    key: '7',
    enableSearch: true
    // width: 150,
  },
  // {
  //   title: '操作',
  //   key: 'operation',
  //   dataIndex: "operation",
  //   fixed: 'right',
  //   width: 150,
  //   render: () => <a href="javascript:;">action</a>,
  // },
];


export default DepartTableColumns;