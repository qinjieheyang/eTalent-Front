export const DepartTableColumns: Array<any> = [
  {
    title: '机构名称',
    key: 'orgName',
    dataIndex: 'orgName',
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
    dataIndex: 'isEnable',
    key: 'isEnable',
    width: 150,
    dataType: "boolean",
    searchData: ["否", "是"]
  },
  {
    title: '机构编码',
    dataIndex: 'orgCode',
    key: 'orgCode',
    width: 150,
    enableSearch: true
  },
  {
    title: '机构类型',
    dataIndex: 'orgType',
    key: 'orgType',
    width: 150,
    dataType: "checkbox",
    enableSearch: true,
    searchData: [{ id: "GROUP", name: "集团" }, { id: "UNIT", name: "单位" }, { id: "DEPT", name: "部门" }]
  },
  {
    title: '上级机构',
    dataIndex: 'orgParentName',
    key: 'orgParentName',
    width: 150,
    enableSearch: true
  },
  {
    title: '部门负责人',
    dataIndex: 'orgManagerName',
    key: 'orgManagerName',
    width: 150,
    enableSearch: true
  },
  {
    title: '机构全称',
    dataIndex: 'orgFullname',
    key: 'orgFullname',
    // width: 150,
    enableSearch: true
  }
];