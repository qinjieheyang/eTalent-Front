import * as React from "react";
import { Dropdown, Button } from "antd";
import "./dropdown.less";

interface IDropdownProp {
  menu: React.ReactNode
}

const DropdownMore = (props: IDropdownProp) => {
  return (
    <Dropdown overlay={props.menu} placement="bottomCenter" trigger={['click']} overlayClassName="qj-dropdown">
      <Button type="primary">更多</Button>
    </Dropdown>
  )
}

export { DropdownMore }