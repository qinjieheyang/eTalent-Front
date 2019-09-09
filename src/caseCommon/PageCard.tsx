import { Card } from "antd";
import * as React from "react";

interface Props {
  title?: string | React.ReactNode;
}

export default class PageContent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);


  }

  public render() {

    const getTitle = () => {
      const { title } = this.props;

      return title === undefined ? null : { title: React.createElement("div", {}, title) };
    }

    return (
      <Card
        bodyStyle={{ padding: 16, height: "calc(100vh - 119px)"}}
        bordered={false}
        {...getTitle()}
      >
        {this.props.children}
      </Card>
    );
  }

}
