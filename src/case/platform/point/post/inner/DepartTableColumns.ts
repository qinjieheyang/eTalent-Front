export const DepartTableColumns = [
  {
    title: '封存',
    dataIndex: 'isEnable',
    key: 'isEnable',
    width: 65,
    dataType: "boolean",
    searchData: ["否", "是"]
  },
  {
    title: '历任',
    key: 'orgName',
    dataIndex: 'orgName',
    width: 150,
    dataType: "linkText",
    enableSearch: true,
    canAutoOrder: true,
    checkNull: true,
    handler: {
      onLinkClick: (row: any) => {
        alert(JSON.stringify(row))
      }
    }
  },
  {
    title: '岗位编码',
    dataIndex: 'orgCode',
    key: 'orgCode',
    width: 150,
    enableSearch: true
  },
  {
    title: '岗位名称',
    dataIndex: 'orgCode',
    key: 'orgCode',
    width: 150,
    enableSearch: true
  },
  {
    title: '所属部门',
    dataIndex: 'orgCode',
    key: 'orgCode',
    width: 150,
    enableSearch: true
  },
  {
    title: '职位名称',
    dataIndex: 'orgCode',
    key: 'orgCode',
    width: 150,
    enableSearch: true
  },
  {
    title: '职级',
    dataIndex: 'orgCode',
    key: 'orgCode',
    width: 150,
    enableSearch: true
  },
  {
    title: '职等',
    dataIndex: 'orgCode',
    key: 'orgCode',
    // width: 150,
    enableSearch: true
  },
  {
    title: '上级岗位',
    dataIndex: 'orgCode',
    key: 'orgCode',
    // width: 150,
    enableSearch: true
  }
];