class Model {
  public name = "hello role ";
}

// tslint:disable-next-line:no-empty-interface
export interface IModel extends Model {}
export const modelIniData: IModel = new Model();
