import * as React from "react";
import {Upload} from "antd";
import { AUploadToCos } from './AUploadToCos';
import { IUploadProps } from './UploadPorps';

export class DraggerToCos extends AUploadToCos {
  constructor(props: IUploadProps) {
    super(props);
  }

  public render() {
    const props = this.getUploadProps();
    return (
      <Upload.Dragger {...props}>
        {this.props.children}
      </Upload.Dragger>
    )
  }
}
