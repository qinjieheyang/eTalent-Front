import * as React from "react";

import CaseCommon from "src/caseCommon/CaseCommon";
const { AsyncComponent } = CaseCommon;

// 异步加载的组件页面
const Table = AsyncComponent(() => import('./tablePanel/Index'));
const Flow = AsyncComponent(() => import('./orgPanel/Index'));

interface IProps {
  tabKey: string;
}
const AsyncContent = (porps: IProps) => {
  const tabKey = porps.tabKey;
  if (tabKey === "table") return <Table />
  if (tabKey === "flow") return <Flow />
  return <div></div>
}

export default AsyncContent;