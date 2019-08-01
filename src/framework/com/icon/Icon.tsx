// https://www.iconfont.cn/ 
// 用户名 ： dbcoder@qq.com
// 密码:    xiaoz0009 
import { Icon as antdIcon } from "antd";
 
import React from 'react';
import  "./Icon.css";
 



 
interface IIconProps{
  type:string ;
  // theme?:ThemeType  ;
  size?:number;
  style?: React.CSSProperties;
}
 
 /** 开发阶段统一在iconfont.cn管理 */
 export   class Icon extends React.Component<IIconProps> {
 
  public static IconfontUrl= "http://at.alicdn.com/t/font_1223516_zp04lfdazc8.js";
  public render(){
    const size= this.props.size== null ?2:this.props.size+"em";
    const style={ ...this.props.style,  fontSize: size };
    return <IconFont type ={ this.props.type}  style={style} />
  }

}


const IconFont = antdIcon.createFromIconfontCN({
  scriptUrl:  Icon.IconfontUrl
});
 

 
