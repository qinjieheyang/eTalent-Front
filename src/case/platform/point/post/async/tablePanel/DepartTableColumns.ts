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
    key: 'history',
    dataIndex: 'history',
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
    dataIndex: 'postName',
    key: 'postName',
    width: 150,
    enableSearch: true
  },
  {
    title: '所属部门',
    dataIndex: 'orgName',
    key: 'orgName',
    width: 150,
    enableSearch: true
  },
  {
    title: '职位名称',
    dataIndex: 'positionName',
    key: 'positionName',
    width: 150,
    enableSearch: true
  },
  {
    title: '职级',
    dataIndex: 'positionLevel',
    key: 'positionLevel',
    width: 150,
    enableSearch: true
  },
  {
    title: '职等',
    dataIndex: 'positionGrade',
    key: 'positionGrade',
    // width: 150,
    enableSearch: true
  },
  {
    title: '上级岗位',
    dataIndex: 'parentPostName',
    key: 'parentPostName',
    // width: 150,
    enableSearch: true
  }
];