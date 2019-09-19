import * as React from "react";

import CaseCommon from "src/caseCommon/CaseCommon";
const { AsyncComponent } = CaseCommon;

// 异步加载的组件页面
const System = AsyncComponent(() => import('./system/index'));
const Group = AsyncComponent(() => import('./group/index'));
const Position = AsyncComponent(() => import('./positon/index'));
const Level = AsyncComponent(() => import('./level/index'));
const Grade = AsyncComponent(() => import('./garde/index'));

interface IProps {
  tabKey: string;
}
const AsyncContent = (porps: IProps) => {
  const tabKey = porps.tabKey;
  if (tabKey === "system") return <System />
  if (tabKey === "group") return <Group />
  if (tabKey === "position") return <Position />
  if (tabKey === "level") return <Level />
  if (tabKey === "grade") return <Grade />
  return <div></div>
}

export default AsyncContent;