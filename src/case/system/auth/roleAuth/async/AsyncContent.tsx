import * as React from "react";

import CaseCommon from "src/caseCommon/CaseCommon";
const { AsyncComponent } = CaseCommon;

// 异步加载的组件页面
const Tab1 = AsyncComponent(() => import('./tab1/Index'));
const Tab2 = AsyncComponent(() => import('./tab2/Index'));
const Tab3 = AsyncComponent(() => import('./tab3/Index'));
const Tab4 = AsyncComponent(() => import('./tab4/Index'));
const Tab5 = AsyncComponent(() => import('./tab5/Index'));

interface IProps {
  tabKey: string;
}
const AsyncContent = (porps: IProps) => {
  const tabKey = porps.tabKey;
  if (tabKey === "tab1") return <Tab1 />
  if (tabKey === "tab2") return <Tab2 />
  if (tabKey === "tab3") return <Tab3 />
  if (tabKey === "tab4") return <Tab4 />
  if (tabKey === "tab5") return <Tab5 />
  return <div></div>
}

export default AsyncContent;