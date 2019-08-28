import * as React from "react";
import { Button } from "antd";

const download = (url: string) => {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', 'excel.xlsx');

  document.body.appendChild(link)
  link.click();
};

interface IDownloadProp {
  url: string;
}

const DownloadFile = (props: IDownloadProp) => {
  return (
    <Button onClick={() => { download(props.url) }}>下载</Button>
  )
}

export { DownloadFile }