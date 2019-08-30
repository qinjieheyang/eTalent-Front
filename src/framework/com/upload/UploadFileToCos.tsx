import * as React from "react";
import {Upload, Button, Icon} from "antd";
import Framework from "src/framework/Framework";

interface IUploadFileProps {
  // bucket: string; //存储筒
  // region: string; //所属地域
  // key: string; //上传文件的COS地址
  // action: string, 
  // beforeUpload: (file: File, fileList: any[]) => boolean;

  // onChange
}

interface IUploadFileState{
  Authorization: string;
  sessionToken: string;
}

export class UploadFileToCos extends React.Component<IUploadFileProps, IUploadFileState> {
  public state: IUploadFileState;
  constructor(props: IUploadFileProps) {
    super(props);
    this.state = {Authorization: "xxx", sessionToken: "xx"};
  }

  //1、上传之前做认证
  //2、上传到腾讯云对象存储
  //3、上传成功通知后端

  public render() {


    const props = {
      name: 'file',
      action: 'https://qinjee-datacenter-1253673776.cos.ap-guangzhou.myqcloud.com',
      headers: {
        Authorization: this.state.Authorization,
        // 'x-cos-security-token': this.state.sessionToken
      },
      // withCredentials: true,
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          console.log(`${info.file.name} file upload failed.`);
        }
      },
      beforeUpload: async (file: any) => {
        const key = "img.jpg"
        const authInfo = await Framework.Utils.UtilUpload.getAuth({key});
        const fd = new FormData();
        // fd.append('key', key);
        // fd.append('Content-Type', '');
        authInfo.Authorization && fd.append('Signature', authInfo.Authorization);
        authInfo.sessionToken && fd.append('x-cos-security-token', authInfo.sessionToken);
        fd.append('file', file);
        // var url = prefix;
        if(authInfo && authInfo.Authorization && authInfo.sessionToken){
          this.setState({Authorization: authInfo.Authorization, sessionToken: authInfo.sessionToken})
        }
        return file;
      }
    };

    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload"/> Click to Upload
        </Button>
      </Upload>
    )
  }
}
