import * as React from "react";
import Framework from "src/framework/Framework";
import { IUploadCosProps, IUploadProps } from './UploadPorps';

const CosConfig = {
  Bucket: 'qinjee-datacenter-1253673776', //存储筒
  Region: 'ap-guangzhou', //所属地域
}


export abstract class AUploadToCos extends React.Component<IUploadProps>{

  public action: string;

  constructor(props: IUploadProps) {
    super(props);
    const { Bucket, Region } = CosConfig;
    this.action = `https://${Bucket}.cos.${Region}.myqcloud.com/`;
  }

  private getAuthFormData = async (filename:string, file: any) => {
    const { Bucket, Region } = CosConfig;
    const info = await Framework.Utils.UtilUpload.getAuth({ Bucket, Region });
    const fd = new FormData();
    fd.append('key', "user/test.txt"); //key需要通过授权获取
    // fd.append('Content-Type', '');
    info.Authorization && fd.append('Signature', info.Authorization);
    info.sessionToken && fd.append('x-cos-security-token', info.sessionToken);
    fd.append(filename, file);
    return fd;
  }

  private upload = ({
    file,
    filename,
    onProgress,
    onSuccess,
    onError
  }: IUploadCosProps) => {
    const http = Framework.DefaultHttp;
    //1、上传之前做认证
    this.getAuthFormData( filename, file).then(fd => {
      //2、上传到腾讯云对象存储
      http.upload(this.action, fd, {
        onUploadProgress: ({ total, loaded }: any) => {
          onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
        },
      }).then(({ data: response }) => {
        onSuccess(response, file);
      })
        .catch(onError);
    });
  }

  public getUploadProps = () => {
    const { beforeUpload, onUploadSuccess } = this.props;
    const _this = this;
    return {
      action: this.action,
      multiple: false,
      beforeUpload,
      onSuccess(response: any, file: any) {
        console.log('onSuccess', response, file.name);
        onUploadSuccess && onUploadSuccess(response, file);
      },
      onError(err: any) {
        console.log('onError', err);
      },
      onProgress({ percent }: any, file: any) {
        console.log('onProgress', `${percent}%`, file.name);
      },
      customRequest({
        filename,
        file,
        onError,
        onProgress,
        onSuccess
      }: any) {
        _this.upload({ filename, file, onProgress, onSuccess, onError });
        return {
          abort() {
            console.log('upload progress is aborted.');
          },
        };
      },
    }
  };

  public abstract render(): JSX.Element;

}