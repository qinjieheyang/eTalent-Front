import React from "react";
import { Modal } from "antd";

import AddForm from "./AddForm";

export interface IAddModalProps {
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const AddModal = (props: IAddModalProps) => {
  const { title = "新增信息", visible, confirmLoading, onOk, onCancel } = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  const formProps = {};

  return (
    <Modal {...modalProps}>
      <AddForm {...formProps} />
    </Modal>
  )
}