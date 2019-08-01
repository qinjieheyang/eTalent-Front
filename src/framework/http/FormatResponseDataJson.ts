import { IFormatResponseData } from "./Http";

/** 统一格式化后端数据 */
export class FormatResponseDataJson implements IFormatResponseData {
    public getData(responseDto: any) {
        return responseDto.data;
    }
}
