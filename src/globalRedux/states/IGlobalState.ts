import * as Framework from "src/framework/Framework";

import { CodeTableCollection } from "./inner/CodeTableCollection";
import { IUserInfo } from "./inner/IUserInfo";
export interface IGlobalState {
    /**  是否请求过程中 */
    isWaitHttpRequest: boolean;
    /** 全局代码表 */
    codeTables: CodeTableCollection;
    /** 当前用户 */
    currentUser: IUserInfo;
    /** 菜单注册器集合 */
    menuRegCollection: Framework.Case.RegCollection;
    /** 是否显示Loading */
    loading: boolean;
}
