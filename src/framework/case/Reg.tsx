import Loadable from "react-loadable";
import Framework from "../Framework";
import { IConst } from "./IConst";

import * as React from "react";

import { Route } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

/** 功能模块Case注册器 */
export class Reg {
  public static CreateCaseReg(Const: IConst, importContainer: any): Reg {
    return new Reg(
      Const.title,
      Const.routePath,
      Const.icon,
      Const.topPath,
      true,
      importContainer
    );
  }

  public static CreatePathReg(
    title: string,
    icon: string,
    routePath: string
  ): Reg {
    return new Reg(title, routePath, icon);
  }

  /** 是否精准路由 */
  public isRouteExact: boolean;
  /** 路由路径 */
  public readonly routePath: string;
  /** 顶级路由路径 */
  public readonly topPath: string;
  /** 显示标题(主) */
  public readonly title: string;
  /** 系统用例模块组件容器（入口） */
  public readonly importContainer: any;
  /** 图标 */
  public readonly icon: string;
  /** 可选，全局才用 */
  public reducer?: (state: any, action: any) => any;
  /** 可选，全局才用 */
  public reduxStatePropertyName?: string;

  /** routePath==MapTo==>SystemCaseReg */
  private children: Map<string, Reg> = new Map<string, Reg>();

  public constructor(
    title: string,
    routePath: string,
    icon: string = Framework.Com.Icons.Case.setting,
    topPath: string = '/',
    isRouteExact: boolean = false,
    importContainer: any = null
  ) {
    if (routePath == null) {
      throw Error("routePath 不能为空");
    }
    this.routePath = routePath.toLowerCase();
    this.topPath = topPath.toLowerCase();
    this.title = title;
    this.icon = icon;
    this.isRouteExact = isRouteExact;
    this.importContainer = importContainer;
    this.reducer = undefined;
    this.reduxStatePropertyName = undefined;
  }

  public getChildren(): Reg[] {
    const ls = new Array<Reg>();
    this.children.forEach(regChild => {
      ls.push(regChild);
    });
    return ls;
  }

  public addChild(child: Reg) {
    const reg = this.children.get(child.routePath);
    if (reg) {
      throw Error("routePath 不能重复:" + child.routePath);
    }
    this.children.set(child.routePath, child);
  }

  public getByRoutePath(routePath: string): Reg | undefined {
    return this.children.get(routePath);
  }

  public isHomePage() {
    return this.routePath === "/";
  }

  public getRoute() {
    const loadContainer = Loadable({
      loader: this.importContainer,
      loading: LoadingComponent,
      timeout: 1000
    });

    const route = (
      <Route
        key={this.routePath}
        exact={this.isRouteExact}
        path={this.routePath}
        component={loadContainer}
      />
    );

    return route;
  }
}
