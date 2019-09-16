// import React from "react";

const DepartTableColumns: Array<any> = [
  {
    title: '机构名称',
    key: 'name',
    dataIndex: 'name',
    width: 150,
    dataType: "linkText",
    enableSearch: true,
    canAutoOrder: true,
    checkNull: true,
    fixed: true,
    handler: {
      onLinkClick: (row: any) => {
        alert(JSON.stringify(row))
      }
    }
  },
  {
    title: '封存',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    canAutoOrder: true,
    enableSearch: true
  },
  {
    title: '机构编码',
    dataIndex: 'address',
    key: '1',
    width: 150,
    enableSearch: true
  },
  {
    title: '机构类型',
    dataIndex: 'address',
    key: '2',
    width: 150,
    enableSearch: true
  },
  {
    title: '上级机构',
    dataIndex: 'address',
    key: '3',
    width: 150,
    enableSearch: true
  },
  {
    title: '部门负责人',
    dataIndex: 'address',
    key: '4',
    width: 150,
    enableSearch: true
  },
  {
    title: '机构全称',
    dataIndex: 'address',
    key: '5',
    // width: 150,
    enableSearch: true
  }
];


export default DepartTableColumns;