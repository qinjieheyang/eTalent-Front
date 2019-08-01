import { Guid } from './inner/Guid';

export class UtilValueClass {
  public isEmpty(valueObject: any): boolean {
    if (valueObject == null) {
        return true;
    }
    if (typeof valueObject ===  "string") {
        if (valueObject.trim() === "") {
            return true;
        }
    }
 
    
    return false;
}

public getGuid = (): string => {
    const guid: any = Guid.Create();
    const text = guid.guid;
    return text;
};
}

/** [单值]工具类 */
export const UtilValue = new UtilValueClass();
