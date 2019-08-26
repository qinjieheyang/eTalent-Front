import React from "react";
import Framework from "src/framework/Framework";
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

import DepartTableColumns from './DepartTableColumns';

interface IDepartTableProps {
  dataSource: Array<any>,
}

const DepartTable = (props: IDepartTableProps) => {

  return (
    <AdaptiveTable
      columns={DepartTableColumns}
      dataSource={props.dataSource}
      minusHeight={264}
    />
  )
}

export default DepartTable;