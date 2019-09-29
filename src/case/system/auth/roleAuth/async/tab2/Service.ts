//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";

export class Service extends Framework.Case.ServiceBase implements IService {

    public searchRoleAuthTree = async () => {

    }

}
