import { IService, ServiceMock } from "./ServiceMock";

export class Service extends ServiceMock implements IService {}

//await this.http.post("api/login/login", { loginname: loginName, password });
