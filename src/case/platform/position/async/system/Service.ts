//  负责调用后端 WebApi数据

import Framework from "src/framework/Framework";
import { IService } from "./ServiceMock";

export class Service extends Framework.Case.ServiceBase implements IService {

    //按职级展示职位体系
    public showByPositionLevel = async () => {
        const { list, columns } = await this.http.get("/positionLevel/showByPositionLevel");
        return { list, columns };
    }

    //按职位展示职位体系
    public showByPosition = async () => {
        const { list, columns } = await this.http.get("/position/showByPosition");
        return { list, columns };
    }

}
