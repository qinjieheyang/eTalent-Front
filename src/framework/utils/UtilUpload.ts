import Framework from "src/framework/Framework";

const COS = require("cos-js-sdk-v5");

///// <reference lib="/src/typings.d.ts" />
// import COS from "cos-js-sdk-v5";

class UtilUploadClass extends Framework.Case.ServiceBase {

  constructor(){
    super();
  }

  /** 获取腾讯云上传签名 */
  public async getAuth(options:any, callback: (info: any)=> void) {
    // const Bucket = 'qinjee-datacenter-1253673776'; //存储筒
    // const Region = 'ap-guangzhou'; //所属地域
    // const protocol = location.protocol === 'https:' ? 'https:' : 'http:';
    // const prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
    const authUrl = ""; // 后端签名接口
    const cos = new COS({
      // 必选参数
      getAuthorization: function (options, callback) {
        try{
          const AuthData = await this.http.get(authUrl, {pathname: '/' + options.Key});
      
          if (AuthData && AuthData.Authorization) {
            callback({
                TmpSecretId: AuthData.TmpSecretId,
                TmpSecretKey: AuthData.TmpSecretKey,
                XCosSecurityToken: AuthData.XCosSecurityToken,
                ExpiredTime: AuthData.ExpiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
            });
          }
        }
        catch(error){
           Framework.Utils.UtilLog.error("COS临时密钥获取失败："+error);
        }
      }
    })
    
    return cos;
  } 

  // public uploadImg(file, ){

  // }

  // /** 上传图片到腾讯云对象存储 */
  // public uploadImgToCos(){

  // }

  // public uploadFile(){

  // }

  // /** 上传文件到腾讯云对象存储 */
  // public uploadFileToCos(){

  // }

}

export const UtilUpload = new UtilUploadClass();