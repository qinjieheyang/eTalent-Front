import Framework from "src/framework/Framework";

// const COS = require("cos-js-sdk-v5");

// import CosAuth from "cos-js-sdk-v5/demo/common/cos-auth";

interface IAuthOpt {
  key: string;
  Bucket?: string;
  Region?: string;
}

interface IAuthInfo {
  sessionToken?: string;
  Authorization?: string;
}

class UtilUploadClass {

  /** 获取腾讯云上传签名 */
  public getAuth = async (options:IAuthOpt): Promise<IAuthInfo> => {
    // const Bucket = 'qinjee-datacenter-1253673776'; //存储筒
    // const Region = 'ap-guangzhou'; //所属地域
    // const protocol = location.protocol === 'https:' ? 'https:' : 'http:';
    // const prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';

    const http = Framework.DefaultHttp;
    const authUrl = "http://192.168.1.119:7000/qinjee/acquire"; // 后端签名接口
    const { key , Bucket = 'qinjee-datacenter-1253673776', Region = 'ap-guangzhou'} = options;
    let data: IAuthInfo = {};
    try{
      data =  await http.get(authUrl, {
        key,
        Bucket,
        Region
      }) as IAuthInfo;
    }
    catch(error){
       Framework.Utils.UtilLog.error("COS临时密钥获取失败："+error);
    }
    return data;
  } 


}

export const UtilUpload = new UtilUploadClass();