//异步加载Component

import React, { Component } from "react";

interface IState {
  component: any;
}

export default function AsyncComponent(importComponent: any) {
  class AsyncComponent extends Component<any, IState> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      if (this.state.component !== null) return;

      try {
        const { default: component } = await importComponent();
        this.setState({ component });
      } catch (err) {
        throw new Error("AsyncComponent 加载失败：" + err);
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}