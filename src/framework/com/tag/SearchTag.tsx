import * as React from "react";
import { Tag } from "antd";

export interface ISearchTagProps {
  color?: string;
  name: string;
  label: string;
  text: string;
  onClose: (fieldName: string) => void;
}

export class SearchTag extends React.Component<ISearchTagProps> {
  public constructor(props: ISearchTagProps) {
    super(props);
  }
  public render = () => {
    const { name, label, text, color } = this.props;
    return (
      <Tag title={text} color={color} closable onClose={() => { this.props.onClose(name) }} >
        <span className="qj-tag-search-lable">{label}:</span>
        <span className="qj-tag-search-txt">{text}</span>
      </Tag>
    );
  };

}