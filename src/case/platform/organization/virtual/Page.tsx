import * as React from "react";
import Framework from "src/framework/Framework";

const { UploadFileToCos } = Framework.Com.Uploads

export default class Page extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <UploadFileToCos />
    )
  }
}
