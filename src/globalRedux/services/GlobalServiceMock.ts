export class GlobalServiceMock {
  public constructor() {}

  // 数据初始化
  public getInit = async (): Promise<{
    name: string;
  }> => {
    return { name: "dfsdfdsf" };
  };
}

export interface IGlobalService extends GlobalServiceMock {}
