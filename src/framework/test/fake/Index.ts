import {IRow, RowsFakeFactory} from "./RowsFakeFactory";


    /** 创建下拉选择基础表 */
      function   createSelectRows(codeTableName: string, rowCount: number = 100): IRow[] {
        const factory = new RowsFakeFactory();
        factory.addStringColumn(codeTableName, "name");
        return factory.createRows(rowCount);
    }

    /** 创建下拉选择基础Tree表 */
    function  createSelectTreeRows(codeTableName: string, rowCount: number = 10): IRow[] {
        const factory = new RowsFakeFactory();
        factory.addStringColumn(codeTableName, "name");
        return factory.createRows(rowCount, 3);
    }

    export {RowsFakeFactory , createSelectRows ,createSelectTreeRows};