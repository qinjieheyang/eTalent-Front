import React, { useState, useEffect, Fragment } from "react";
import { Radio, Table } from "antd";


interface IProps {
  columnCollection: any[];
  dataCollection: any[];
}

const PositionSystem = (props: IProps) => {
  const { columnCollection = [], dataCollection = [] } = props;

  const [positionType, setPositionType] = useState(0);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setColumns(columnCollection[positionType]);
    setData(dataCollection[positionType]);
  })

  const handlePositionTypeChange = (e: any) => {
    const value = e.target.value;
    setPositionType(value);
    setColumns(columnCollection[value]);
    setData(dataCollection[value]);
  }

  return (
    <Fragment>
      <Radio.Group value={positionType} onChange={handlePositionTypeChange} style={{marginBottom: 16}}>
        <Radio value={0}>按职级</Radio>
        <Radio value={1}>按职位</Radio>
      </Radio.Group>
      <Table className="qj-table-no-hover" columns={columns} dataSource={data} bordered pagination={false} />
    </Fragment>
  )
}

export default PositionSystem;