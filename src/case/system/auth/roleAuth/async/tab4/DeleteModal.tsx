import * as React from "react";
import { Modal, Icon } from "antd";

import Framework from "src/framework/Framework";

const { CheckBoxList } = Framework.Com.CheckBox;

export interface IDeleteModalProps {
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
  checkedList: any[];
  onCheckedChange: (checkedValues: any[]) => void;
}


export const DeleteModal = (props: IDeleteModalProps) => {
  const { title = "确认删除", visible, confirmLoading, onOk, onCancel, checkedList, onCheckedChange } = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  return (
    <Modal {...modalProps}>
      <p style={{ lineHeight: 1.5 }}>
        <Icon type="question-circle" theme="filled" style={{ color: "#FFD532", fontSize: 20, verticalAlign: "text-top" }} />
        <span style={{ fontWeight: "bold", marginLeft: 8 }}>确认删除下表选中的职位族吗？</span>
      </p>
      <div>
        <CheckBoxList items={checkedList} onChange={onCheckedChange} />
      </div>
    </Modal>
  )
}