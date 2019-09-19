import * as React from "react";
import * as Framework from 'src/framework/Framework';
// import { ICodeTables } from "src/pas/setup/CodeTables";

/** 功能模块.入口页面基类 */
export default abstract class PageAsyncBase<TProps, TState,TCaseService > extends React.Component<TProps,TState> {

  protected service: TCaseService;
  constructor(props: TProps , Const :Framework.Case.IAsyncConst ,ServiceMockType :new ()=>TCaseService ,ServiceType:new ()=>TCaseService) {
    super(props);
    if(Framework.isDebugModel() === false ){
      this.service =  new ServiceType();
    }
    else if(Const.isTest  === false   ){
      this.service =  new ServiceType();
    }
    else{
      this.service =  new ServiceMockType();
    }
    
  }

  public componentDidMount() {
    this.init();
  }

  public get codeTables(): any {
    const props = this.props as any;
    if (!props.codeTable) {
      throw new Error(
        "PageBase.props.codeTables不能为空，请检查'Container.ts'代码 "
      );
    }

    return props.codeTables;
  }

  public abstract init(): void;
}
