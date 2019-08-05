import * as React from "react";

interface IPageWrapper {
  page: any;
}

export default class PageWrapper extends React.Component<IPageWrapper> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div style={{overflowY:'auto',overflowX:'hidden', height:'100%'}}>
          <div style={{padding: "24px 16px"}}>
          {
            this.props.page
          }
          </div>
      </div>
    );
  }
}
