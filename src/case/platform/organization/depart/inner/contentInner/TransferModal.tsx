import React from "react";
import { Modal } from "antd";

import TransferForm from "./TransferForm";

interface ITransferModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const TransferModal = (props: ITransferModalProps) => {
  const { title = "机构划转", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  const formProps = {};

  return (
    <Modal {...modalProps}>
      <TransferForm {...formProps}/>
    </Modal>
  )
}

export default TransferModal;