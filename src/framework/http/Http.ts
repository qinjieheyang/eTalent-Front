import { notification } from "antd";
import axios, { AxiosPromise } from "axios";
import { FormatResponseDataJson } from "./FormatResponseDataJson";
import { HttpRequestWaitHandler } from "./HttpRequestWaitHandler";
import HttpRunTimeWatch from "./HttpRunTimeWatch";

export interface IFormatResponseData {
  getData(responseDto: any): any;
}

const defaultFormat = new FormatResponseDataJson();

export interface IErrorInfo {
  error: string;
}
export class Http {
  private waitHandler = new HttpRequestWaitHandler(null); // 默认空，不处理

  private token: string = "";
  // private ax = axios.create({ baseURL: "/", headers: { 'X-Access-Token':null}, timeout: 10000, });
  private ax = axios.create({
    baseURL: "/",
    headers: { "X-Access-Token": this.token },
    timeout: 10000
  });
  private formatResponse: IFormatResponseData;

  public constructor(formatResponse: IFormatResponseData = defaultFormat) {
    this.formatResponse = formatResponse;
    this.ax = axios.create({ baseURL: "/", timeout: 10000 });
  }

  /** 设置等待处理器者 */
  public setWaitHandler(waitHandler: HttpRequestWaitHandler) {
    if (waitHandler == null) {
      throw new Error("setWaitHandler(waitHandler:参数不能为空)");
    }
    this.waitHandler = waitHandler;
  }

  public SetXAccessTokenOnheader = (tokenString: string) => {
    this.token = tokenString;
    this.ax = axios.create({
      baseURL: "/",
      headers: { "X-Access-Token": this.token },
      timeout: 10000
    });
  };

  // public SetContentTypeOnHeader

  public get = (url: string, params?: any): Promise<any> => {
    // AxiosPromise
    const watch = HttpRunTimeWatch.create(url);
    this.waitHandler.Start();
    return this.ax
      .get(url, { params }) // , headers: { 'X-Access-Token': this.token, "xxxx1": "xxx1111" }
      .catch((error: any) => this.NotifiedError(error, url))
      .then((responseDto: any) => this.formatData(responseDto, watch, url));
  };

  public getOnly = (url: string, params?: any): AxiosPromise => {
    this.waitHandler.Start();
    return this.ax
      .get(url, { params })
      .catch((error: any) => this.NotifiedError(error, url));
  };

  public post = (url: string, params?: any, config?: any): AxiosPromise => {
    const watch = HttpRunTimeWatch.create(url);
    this.waitHandler.Start();
    return this.ax
      .post(url, params, config)
      .catch(error => this.NotifiedError(error, url))
      .then(responseDto => this.formatData(responseDto, watch, url));
  };

  public put = (url: string, params?: any, config?: any): AxiosPromise => {
    const watch = HttpRunTimeWatch.create(url);
    this.waitHandler.Start();
    return this.ax
      .put(url, params, config)
      .catch(error => this.NotifiedError(error, url))
      .then(responseDto => this.formatData(responseDto, watch, url));
  };

  public delete = (url: string): AxiosPromise => {
    const watch = HttpRunTimeWatch.create(url);
    this.waitHandler.Start();
    return this.ax
      .delete(url)
      .catch(error => this.NotifiedError(error, url))
      .then(responseDto => this.formatData(responseDto, watch, url));
  };

  public upload = (url: string, params?: any, config?: any) : AxiosPromise => {
    const watch = HttpRunTimeWatch.create(url);
    this.waitHandler.Start();
    return this.ax
      .post(url, params, {
        headers: { "Content-Type": "multipart/form-data" },
        ...config
      })
      .catch(error => this.NotifiedError(error, url))
      .then(responseDto => {
        this.waitHandler.End();
        watch.finishWatch();
        window.console.log("文件上传成功："+watch.GetRunTimeFormatText());
        return responseDto;
      });

  }

  public loginOff(): void {
    this.deleteCookie("isLogin");
    this.deleteCookie("x-access-token");
    this.SetXAccessTokenOnheader("");
  }

  /** 不起作用 */
  private deleteCookie = (name: string) => {
    document.cookie =
      "x-access-token=;Path=/;Expires=Fri, 25-Jan-2001 23:44:11 GMT;Max-Age=1;HttpOnly";
    document.cookie =
      "isLogin=flase;Path=/;Expires=Fri, 25-Jan-2001 23:44:11 GMT;Max-Age=1";
  };

  /** 进一步格式化数据 */
  private formatData = (
    responseDto: any,
    timeWatch: HttpRunTimeWatch,
    url: string
  ) => {
    this.waitHandler.End();
    if (timeWatch != null) {
      timeWatch.finishWatch();
      window.console.log(timeWatch.GetRunTimeFormatText());
    }

    if (responseDto == null) {
      notification.warn({
        message: "系统后端Api错误:" + url,
        description: "请求数据不能为null"
      });

      throw new Error(url + "： 发生错误");
    }
    if (responseDto.data == null) {
      return {};
    }
    if (responseDto.data.status < 0) {
      notification.warn({
        message: "http.data.status:" + responseDto.data.status,
        description: responseDto.data.message
      });
      throw new Error(url + ",失败:" + responseDto.data.message);
    }
    window.console.info(url + " ==> responseDto.data:", responseDto.data);
    const formatDto = this.formatResponse.getData(responseDto);
    return formatDto;
  };

  /** 错误处理 */
  private NotifiedError = (error: any, url: string) => {
    this.waitHandler.End();
    notification.warn({
      message: "系统后端错误:" + url,
      description: error.message
    });
    throw new Error(url + ",失败:" + error);
  };
}
