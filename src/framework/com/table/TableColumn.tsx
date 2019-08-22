interface IColumn {
  title: string;
  filedName: string;
  width?: number;
  filedType: string;
  
}

export class TableColumnCreater {
  private columns:IColumn[] = [];

  constructor(columns: IColumn[]){
    this.columns = columns;
  }

  

}