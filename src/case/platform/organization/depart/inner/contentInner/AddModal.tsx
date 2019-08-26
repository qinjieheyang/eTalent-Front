import React from "react";
import { Modal } from "antd";

import AddForm from "./AddForm";

interface IAddModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const AddModal = (props: IAddModalProps) => {
  const { title = "新增机构", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  const formProps = {};

  return (
    <Modal {...modalProps}>
      <AddForm {...formProps}/>
    </Modal>
  )
}

export default AddModal;