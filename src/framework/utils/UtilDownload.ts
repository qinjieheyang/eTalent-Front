interface IFileParam {
  url: string;
  fileName?: string;
}

class UtilDownloadClass {

  public Img(params: IFileParam) {
    const url = params.url;
    const fileName = params.fileName ? params.fileName : url.substring(url.lastIndexOf('/') + 1);
    const image = new Image();
    image.setAttribute("crossOrigin", 'Anonymous');
    image.src = url;
    image.onload = function () {
      const imageDataUrl = image2base64(image);
      let link = document.createElement('a');
      link.download = fileName;
      link.href = imageDataUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  public File(params: IFileParam) {
    const url = params.url;
    const fileName = params.fileName ? params.fileName : url.substring(url.lastIndexOf('/') + 1);
    let link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

const image2base64 = (img: any) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx && ctx.drawImage(img, 0, 0, img.width, img.height);
  const mime = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  const dataUrl = canvas.toDataURL("image/" + mime);
  return dataUrl;
}

export const UtilDownload = new UtilDownloadClass();
