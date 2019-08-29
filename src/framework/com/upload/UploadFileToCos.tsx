import * as React from "react";
import { Upload, Button, Icon } from "antd";
import { RcFile } from 'antd/lib/upload';

interface IUploadFileProps {
  action: string,
  // beforeUpload: (file: File, fileList: any[]) => boolean;

  // onChange
}

export class UploadFileToCos extends React.Component<IUploadFileProps>{

  constructor(props: IUploadFileProps) {
    super(props);
  }
  //1、上传之前做认证
  //2、上传到腾讯云对象存储
  //3、上传成功通知后端

  
  public render() {
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      beforeUpload: (file: RcFile, FileList: RcFile[]) => {
        return new Promise((resolve, reject)=>{
          resolve(file);
        })
        // return false;
      }
    };

    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload"/> Upload
        </Button>
      </Upload>
    )
  }

}