
export interface IUploadProps {
  // Key: string; //上传文件的COS地址
  data?: object;
  onUploadSuccess?: (response: any, file: any) => void;
  beforeUpload?: (file: any, fileList: any[]) => boolean;
}

export interface IUploadCosProps {
  // Key: string;
  filename: string;
  file: any;
  onSuccess: (response: any, file: any) => void;
  onError: (err: any) => void;
  onProgress : ({ percent }: any, file: any) => void;
}