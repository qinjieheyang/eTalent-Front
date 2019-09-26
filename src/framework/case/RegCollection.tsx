
import { Reg } from "./Reg";

export class RegCollection {

  private topRegs = new Map<string, Reg>();
  private allRegs = new Map<string, Reg>();


  public add(caseFlowReg: Reg): void {
    // 处理Top层

    this.topRegs.set(caseFlowReg.routePath, caseFlowReg);
    this.allRegs.set(caseFlowReg.routePath, caseFlowReg);

    // 处理2层
    caseFlowReg.getChildren().forEach((reg2: Reg) => {
 
      this.allRegs.set(reg2.routePath, reg2);
      
      // 处理3层
      reg2.getChildren().forEach((reg3: Reg) => {
  
        this.allRegs.set(reg3.routePath, reg3);

      });
    });
  }

  public getRoutes = (): JSX.Element[] => {
    const ls: JSX.Element[] = Array<JSX.Element>();

    // 添加SystemCase路由
    const regs = this.getAllRegs();

    regs.forEach(reg => {
      if (reg.importContainer == null) {
        return;
      }

      const route =  reg.getRoute();
      ls.push(route);
    });
    return ls;
  };

  public getTopRegByRoutePath(routePath: string): Reg | undefined {
    const topReg = this.topRegs.get(routePath);
    if (topReg) {
      return topReg;
    }
    return undefined;
  }
  public getParentRegByRoutePath = (routePath: string): Reg | undefined => {
    let parentReg: Reg | undefined;
    const topRegs = this.getTopRegs();
    for (const topReg of topRegs) {
      const childReg = topReg.getByRoutePath(routePath);
      if (!childReg) {
        continue;
      }
      parentReg = topReg;
      break;
    }
    return parentReg;
  };
  public getRegByRoutePath(routePath: string): Reg | undefined {
    return this.allRegs.get(routePath);
  }
  /** 获取第1层Regs */
  public getTopRegs(): Reg[] {
    const ls = Array<Reg>();
    this.topRegs.forEach((reg, key) => {
      ls.push(reg);
    });
    return ls;
  }
  /** 获取全部Reg包括第二层 */
  public getAllRegs = (): Reg[] => {
    const ls = Array<Reg>();
    this.allRegs.forEach((reg, key) => {
      ls.push(reg);
    });
    return ls;
  };

  //需要通过topReg拿到sideRegs
  getSideRegsByRoutePath(routePath: string): RegCollection {
    let topReg = this.getTopRegByRoutePath(routePath);
    console.log(topReg,routePath,222)
    const sideRegs = new RegCollection();
    if(topReg){
      topReg.getChildren().forEach(reg =>{
        sideRegs.add(reg);
      })
    }
    return sideRegs;
  }
}
