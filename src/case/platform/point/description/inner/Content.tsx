import * as React from "react";
import { Button } from "antd";
import { Editor } from '@tinymce/tinymce-react';
import CaseCommon from "src/caseCommon/CaseCommon";



interface IContentState {

}
interface IContentProps {
  dataSource: Array<any>;
}
export default class Content extends React.Component<IContentProps, IContentState> {
  public state: IContentState;

  constructor(props: IContentProps) {
    super(props);

  }

  public render() {


    return (
      <CaseCommon.PageCard title={
        <div className="qj-page-card-title-btn-warpper">
          <Button type="primary">编辑</Button>
          <Button>打印</Button>
          <Button >导入</Button>
          <Button>导出</Button>
        </div>
      }>
        <Editor
          apiKey="API_KEY"
          init={{ plugins: 'link table' }}
        />
      </CaseCommon.PageCard>

    );
  }

}
