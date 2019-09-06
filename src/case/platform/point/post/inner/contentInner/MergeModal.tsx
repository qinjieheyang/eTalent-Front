import React from "react";
import { Modal } from "antd";

import MergeForm from "./MergeForm";

interface IMergeModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const MergeModal = (props: IMergeModalProps) => {
  const { title = "合并机构", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  const formProps = {};

  return (
    <Modal {...modalProps}>
      <MergeForm {...formProps}/>
    </Modal>
  )
}

export default MergeModal;