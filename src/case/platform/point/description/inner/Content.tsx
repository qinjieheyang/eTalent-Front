import * as React from "react";
import { Button, Upload, message } from "antd";
import { Editor } from '@tinymce/tinymce-react';
import CaseCommon from "src/caseCommon/CaseCommon";



interface IContentState {

}
interface IContentProps {
  dataSource: Array<any>;
}
export default class Content extends React.Component<IContentProps, IContentState> {
  public state: IContentState;

  private editor: any;

  constructor(props: IContentProps) {
    super(props);

  }

  public render() {
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList: false,
      onChange(info: any) {

      },
    };
    return (
      <CaseCommon.PageCard title={
        <div className="qj-page-card-title-btn-warpper">
          <Button type="primary">保存</Button>
          <Button onClick={this.onPrint}>打印</Button>
          <span style={{ display: "inline-block", marginRight: 8 }}>
            <Upload {...props} >
              <Button >导入</Button>
            </Upload>
          </span>
          <Button onClick={this.onExport}>导出</Button>
        </div>
      }>
        <Editor
          apiKey="0cp5cdywq4wik2cyx1ewp0q7dhwg5762uhpv6t7pcblkkkij"
          toolbar='undo redo | formatselect | bold italic | insertdatetime image table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent'
          init={{
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            menubar: false,
            height: "100%",
            setup: (ed: any) => {
              this.editor = ed;
            }
          }}
        />
      </CaseCommon.PageCard>

    );
  }

  public onPrint = () => {
    this.editor.execCommand("print");
  }

  public onExport = () => {
    message.info('调用导出接口');
  }
}
