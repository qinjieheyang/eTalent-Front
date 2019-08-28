import * as React from "react";

const download = (url: string, fileName: string) => {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', 'excel.xlsx');
  link.click();
};

interface IDownloadProp {
  url: string;
  fileName?: string|undefined;
}

const DownloadFile = (props: IDownloadProp) => {
  return (
    <span onClick={() => { download(props.url, props.fileName||"download") }}>下载</span>
  )
}

export { DownloadFile }