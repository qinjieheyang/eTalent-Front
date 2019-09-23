import React, { useState } from "react";
import { Card } from "antd";

import { PageLayout, PageContent } from 'src/caseCommon/PageCommon';
import AsyncContent from "./async/AsyncContent";
import { TabList } from "./Const";

const Page = () => {

  const [tabKey, setTabKey] = useState(TabList[0].key);

  return (
    <PageLayout>
      <PageContent>
        <Card
          className="qj-card-async"
          tabList={TabList}
          activeTabKey={tabKey}
          onTabChange={setTabKey}
          headStyle={{ paddingLeft: 0 }}
          bodyStyle={{ height: "calc(100vh - 151px)", padding: 0 }}
        >
          <AsyncContent tabKey={tabKey} />
        </Card>
      </PageContent>
    </PageLayout>
  );
}

export default Page;