import * as React from "react";

import CaseCommon from "src/caseCommon/CaseCommon";
const { AsyncComponent } = CaseCommon;

// 异步加载的组件页面
const System = AsyncComponent(() => import('./system/Index'));
const Group = AsyncComponent(() => import('./group/Index'));
const Position = AsyncComponent(() => import('./positon/Index'));
const Level = AsyncComponent(() => import('./level/Index'));
const Grade = AsyncComponent(() => import('./garde/Index'));

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