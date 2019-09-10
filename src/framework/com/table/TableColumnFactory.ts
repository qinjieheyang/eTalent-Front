import { TableColumnBuilder, IColumnSortDefine } from "./TableColumnBuilder";
import { IColumnDefine } from "./tableColumns/IColumnDefine";

enum ColumnType {
  text = "AddText",
  number = "AddNumber",
  boolean = "AddBool",
  date = "AddDate",
  checkbox = "AddIdToName",
  treeText = "AddTreeText",
  linkText = "AddLinkText"
}

/** 伪造工厂 */
export class TableColumnFactory {
  private bulider: TableColumnBuilder;

  constructor() {
    this.bulider = new TableColumnBuilder();
  }

  public createColumns(columns: IColumnDefine[]): IColumnSortDefine[] {
    for (const col of columns) {
      col.dataType = col.dataType || "text";
      if (!ColumnType[col.dataType]) {
        throw new Error("ColumnType 不存在类型: " + col.dataType);
      }
      this.bulider[ColumnType[col.dataType]](col);
    }
    return this.bulider.GetColumns();
  }

  public getBuilder = () => {
    return this.bulider;
  };

  public GetCheckedColumns = () => {
    return this.bulider.GetCheckedColumns();
  };
}
