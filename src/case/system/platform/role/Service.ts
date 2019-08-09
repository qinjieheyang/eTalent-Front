import { IService } from "./ServiceMock";

export class Service implements IService {
  // 数据初始化
  public getInit = async (): Promise<{
    name: string;
  }> => {
    return { name: "dfsdfdsf" };
  };
}
