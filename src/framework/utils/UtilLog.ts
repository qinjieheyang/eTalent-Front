class UtilLogClass {
  public info = (msg: string, ...val: any) => {
    if (!window) {
      return;
    }
    if (!window.location) {
      return;
    }
    if (window.location.host.indexOf("localhost") < 0) {
      return;
    }
    window.console.info(msg, val);
  };

  public warn = (msg: string, ...val: any) => {
    if (!window) {
      return;
    }
    if (!window.location) {
      return;
    }
    if (window.location.host.indexOf("localhost") < 0) {
      return;
    }
    window.console.warn(msg, val);
  };

  public error = (msg: string, ...val: any) => {
    if (!window) {
      return;
    }
    if (!window.location) {
      return;
    }
    if (window.location.host.indexOf("localhost") < 0) {
      return;
    }
    window.console.error(msg, val);
  };

  public group = (msg: string, ...val: any) => {
    if (!window) {
      return;
    }
    if (!window.console.group) {
      return;
    }
    if (window.location.host.indexOf("localhost") < 0) {
      return;
    }
    window.console.groupCollapsed(msg, val);
  };

  public groupEnd = () => {
    if (!window) {
      return;
    }
    if (window.location.host.indexOf("localhost") < 0) {
      return;
    }
    window.console.groupEnd();
  };
}

export const UtilLog = new UtilLogClass();
