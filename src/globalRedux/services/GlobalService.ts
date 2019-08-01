import { IGlobalService } from "./GlobalServiceMock";

export class GlobalService implements IGlobalService {
  // 数据初始化
  public getInit = async (): Promise<{
    name: string;
  }> => {
    return { name: "dfsdfdsf" };
  };
}
