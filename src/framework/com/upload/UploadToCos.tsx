import * as React from "react";
import {Upload, Button, Icon} from "antd";
import { AUploadToCos } from './AUploadToCos';
import { IUploadProps } from './UploadPorps';

export class UploadToCos extends AUploadToCos {
  constructor(props: IUploadProps) {
    super(props);
  }

  public render() {
    const props = this.getUploadProps();
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload"/> 上传
        </Button>
      </Upload>
    )
  }
}
