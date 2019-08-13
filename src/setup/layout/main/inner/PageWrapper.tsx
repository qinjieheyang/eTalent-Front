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
        {
          this.props.page
        }
      </div>
    );
  }
}
