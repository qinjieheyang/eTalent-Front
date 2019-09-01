// import * as React from "react";
// import {Upload, Button, Icon} from "antd";


// interface IUploadProps {
//   key: string; //上传文件的COS地址
//   data?: object;
//   onSuccess?: (response: any, file: any) => void;
//   beforeUpload?: (file: any, fileList: any[]) => boolean;
// }

// export class UploadFileToCos extends React.Component<IUploadProps> {
//   constructor(props: IUploadProps) {
//     super(props);
//   }

//   public render() {
//     const uploadProps = {
//       action: action,
//       onStart(file: any) {
//         console.log('onStart', file, file.name);
//       },
//     };

//     return (
//       <Upload {...uploadProps}>
//         <Button>
//           <Icon type="upload"/> 上传
//         </Button>
//       </Upload>
//     )
//   }
// }
