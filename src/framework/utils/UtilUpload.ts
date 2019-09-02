import Framework from "src/framework/Framework";

// import CosAuth from "cos-js-sdk-v5/demo/common/cos-auth";

interface IAuthOpt {
  Bucket?: string;
  Region?: string;
}

interface IAuthInfo {
  sessionToken?: string|undefined;
  Authorization?: any;
  // tmpSecretId?: string;
  // tmpSecretKey?: string;
}

// interface IRespones {
//   sessionToken?: string;
//   tmpSecretId?: string;
//   tmpSecretKey?: string;
// }
class UtilUploadClass {

  /** 获取腾讯云上传签名 */
  public getAuth = async (options:IAuthOpt): Promise<IAuthInfo> => {
    // const Bucket = 'qinjee-datacenter-1253673776'; //存储筒
    // const Region = 'ap-guangzhou'; //所属地域
    // const protocol = location.protocol === 'https:' ? 'https:' : 'http:';
    // const prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';

    const http = Framework.DefaultHttp;
    const authUrl = "http://192.168.1.119:7000/qinjee/acquire"; // 后端签名接口
    const { Bucket = 'qinjee-datacenter-1253673776', Region = 'ap-guangzhou'} = options;
    let data: IAuthInfo = {};
    try{
      const res =  await http.post(authUrl, {
        Bucket,
        Region
      }) as IAuthInfo;
      if(res){
        
        // const data1 ={
        //   sessionToken: res.sessionToken,
        //   Authorization: CosAuth({
        //       SecretId: res.tmpSecretId,
        //       SecretKey: res.tmpSecretKey,
        //       Method: "POST",
        //       Expires: 1800
        //   })
        // }
        data = {
          sessionToken: res.sessionToken,
          Authorization: res.Authorization,
        }
        
        // console.log(JSON.stringify(data.Authorization))
        // console.log(JSON.stringify(data1.Authorization))
      }
    }
    catch(error){
       Framework.Utils.UtilLog.error("COS临时密钥获取失败："+error);
    }
    return data;
  } 


}

export const UtilUpload = new UtilUploadClass();