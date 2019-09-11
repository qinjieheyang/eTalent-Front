import * as React from "react";
import { Button, Upload, message, Tabs, Card } from "antd";
import { Editor } from '@tinymce/tinymce-react';
const { TabPane } = Tabs;



interface IContentState {

}
interface IContentProps { }
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
      <React.Fragment>
        <Tabs size="large" animated={false} tabBarStyle={{ marginBottom: 0, background: "#fff" }}>
          <TabPane key="1" className="qj-depart-tab-pane"
            tab="岗位说明书">
            <Card style={{ margin: 16 }} bodyStyle={{ padding: 16, height: "calc(100vh - 151px)" }} bordered={false}>
              <div className="qj-depart-btns">
                <Button type="primary">保存</Button>
                <Button onClick={this.onPrint}>打印</Button>
                <span style={{ display: "inline-block", marginRight: 8 }}>
                  <Upload {...props} >
                    <Button >导入</Button>
                  </Upload>
                </span>
                <Button onClick={this.onExport}>导出</Button>
              </div>
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
                  height: "calc(100vh - 235px)",
                  setup: (ed: any) => {
                    this.editor = ed;
                  }
                }}
              />
            </Card>
          </TabPane>
        </Tabs>
      </React.Fragment>
    );
  }

  public onPrint = () => {
    this.editor.execCommand("print");
  }

  public onExport = () => {
    message.info('调用导出接口');
  }
}
