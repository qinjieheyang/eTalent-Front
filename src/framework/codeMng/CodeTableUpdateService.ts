import { notification } from "antd";
import CodeTable from "./CodeTable";

import { Http } from "../http/Http";
import { UtilLocalStorage } from "../utils/UtilBrowserStorage";

import { HandleActionTemplate } from "../action/actionHandler/HandleActionTemplate";
import { UtilLog } from "../utils/UtilLog";

const STORE_KEY = "CodeTableMng";

export interface IReduxStore {
    dispatch: (action: any) => void;
}

/** 代码表同步更新服务 */
export default class CodeTableUpdateService {
    private codeMapCodeTable: Map<string, CodeTable> = new Map<string, CodeTable>();
    private store: IReduxStore;
    private http: Http;
    private timestamp: number = 0;
    // private currentDto: { timestamp: number; items: any[] };

    constructor(http: Http, store: IReduxStore) {
        this.http = http;
        this.store = store;

        // 浏览器缓存恢复
        let dto: { timestamp: number; items: [] } = UtilLocalStorage.get(STORE_KEY);
        if (!dto) {
            dto = { timestamp: 0, items: [] };
            return;
        }
        if (!dto.timestamp) {
            dto.timestamp = 0;
        }
        if (!dto.items) {
            dto.items = [];
        }

        this.timestamp = dto.timestamp;
        this.ResetCodeMapCodeTable(dto.items);
    }

    public UpdateCache = async () => {
        try {
            const response = await this.http.get("api/bas_common_service/get_all_code", {
                t: this.timestamp
            });
            if (response == null) {
                return;
            }
            if (response.data == null) {
                UtilLog.error("***全局标准表：前端APP框架无法统一获取***");
                return;
            }
            const dto = response.data;

            if (!dto.items) {
                return;
            }
            if (dto.items.length === 0) {
                return;
            }
            if (!dto.timestamp) {
                throw Error("获取全部公共代码错误：timestamp属性不存在！");
            }
            if (dto.items == null) {
                throw Error("dto.items不能等于null");
            }

            this.ResetCodeMapCodeTable(dto.items);
            UtilLocalStorage.save(STORE_KEY, dto);
            this.dispatchAction();
        } catch (e) {
            notification.warn({
                message: "CodeTableListService.UpdateCache()发生错误:",
                description: "" + e
            });
            UtilLog.error("错误:", e);
        }
    };

    // private getWebApiCodeTables = () => {};

    private ResetCodeMapCodeTable = (tableDtos: any[]) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tableDtos.length; i++) {
            const tableDto = tableDtos[i];
            const codeTable = new CodeTable(tableDto);
            this.codeMapCodeTable.set(codeTable.Code, codeTable);
        }

        // yes no
        const yesNoTableDto = {
            id: "yesNo",
            code: "yesNo",
            name: "是否",
            codeItems: [{ id: "true", name: "是" }, { id: "false", name: "否" }]
        };
        const yesNoCodeTable = new CodeTable(yesNoTableDto);

        this.codeMapCodeTable.set(yesNoCodeTable.Code, yesNoCodeTable);

        // codeDefine
        const defineTableDto = createDefineTable(tableDtos);
        const defineTable = new CodeTable(defineTableDto);
        this.codeMapCodeTable.set(defineTable.Code, defineTable);
    };

    private dispatchAction = () => {
        const codeTables = new Array<CodeTable>();
        this.codeMapCodeTable.forEach((val: CodeTable) => {
            codeTables.push(val);
        });
        const ac = new HandleActionTemplate("codeTables", codeTables);
        ac.meReducer = (newModel: any) => {
            const tables: CodeTable[] = ac.data;

            for (const table of tables) {
                newModel[table.Code] = table.GetTopRows();
            }
        };
        this.store.dispatch({ ...ac });
    };
}

/** 【代码定义表】也纳入CodeTable管理 */
const createDefineTable = (tableDtos: any[]): any => {
    const defineTableDto = { id: -999909, codeDepth: 1, code: "codeDefine", codeItems: new Array<any>() };
    for (const tableDto of tableDtos) {
        defineTableDto.codeItems.push({ id: tableDto.code, name: tableDto.name });
    }
    return defineTableDto;
};
