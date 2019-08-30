import * as React from "react";
import {Upload, Button, Icon} from "antd";

export default class Page extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
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
      beforeUpload: (file: any) => {
        // const  sleep = async (state: boolean) => {
        //     return new Promise((resolve, reject) => {
        //         resolve(state);
        //     });
        // };
        // return await sleep;
        // return Promise<{state: boolean}> => {
        //     // const data = await this.http.get("/api/home/getInit");
        //     return false;
        // };
        // return new Promise((resolve) => {
        //   console.log('start check');
        //   setTimeout(() => {
        //     console.log('check finshed');
        //     resolve(file);
        //   }, 3000);
        // });
        return false;
      },
    };

    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    )
  }
}
