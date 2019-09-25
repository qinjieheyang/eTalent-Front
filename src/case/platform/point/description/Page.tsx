import * as React from "react";
import { Button, Upload, message } from "antd";
import Framework from 'src/framework/Framework';
import { PageCard } from 'src/caseCommon/PageCommon';
import * as GlobalRedux from "src/globalRedux/GlobalRedux";
import CaseCommon, { OrgTree } from "src/caseCommon/CaseCommon";
import { PageLayout, PageSide, PageContent } from "src/caseCommon/PageCommon";
import { Const } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { initState, IState } from "./State";
// import 'tinymce';
import { Editor } from '@tinymce/tinymce-react';
import "./Style.less";

interface IPageProps extends GlobalRedux.Actions.IGlobalActionDispatcher { }

class Page extends CaseCommon.PageBase<IPageProps, IState, IService> {

  public state = initState;

  private editor: any;

  constructor(props: IPageProps) {
    super(props, Const, ServiceMock, Service);
  }

  public async init() {
    const treeData = await this.service.getOrganizationTree();

    this.setState({ treeData });
    // console.log(window["tinymce"].baseURL )

  }

  public render() {
    const { treeData, selectedKeys, isEnable } = this.state;

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
      <PageLayout>
        <PageSide>
          <OrgTree showAll={isEnable} onShowChange={this.handleShowChange} treeData={treeData} selectedKeys={selectedKeys} onSelect={this.handleSelectTreeNode} />
        </PageSide>
        <PageContent>
          <PageCard>
            <div>
              <Framework.Com.Buttons.Tool.LeftArea>
                <Button type="primary">保存</Button>
                <Button onClick={this.onPrint}>打印</Button>
                <Upload {...props} >
                  <Button >导入</Button>
                </Upload>
                <Button onClick={this.onExport}>导出</Button>
              </Framework.Com.Buttons.Tool.LeftArea>
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
                height: "calc(100% - 48px)",
                setup: (ed: any) => {
                  this.editor = ed;
                },
                base_url: "https://cdn.bootcss.com/tinymce/5.0.15/"
              }}
            />
          </PageCard>
        </PageContent>
      </PageLayout>
    );
  }

  //是否显示封存
  private handleShowChange = async (checked: boolean) => {
    this.setState({ isEnable: checked })
  }

  private handleSelectTreeNode = (selectedKeys: string[]) => {
    this.setState({ selectedKeys })
  }

  public onPrint = () => {
    this.editor.execCommand("print");
  }

  public onExport = () => {
    message.info('调用导出接口');
  }

}

export default GlobalRedux.ConnectPage.ConnectGlobal(Page)