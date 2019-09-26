import React from "react";
import { Modal } from "antd";

import AddForm from "./AddForm";

export interface IAddModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const AddModal = (props: IAddModalProps) => {
  const { title = "基本信息", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  const formProps = {};

  return (
    <Modal {...modalProps} width={760}>
      <AddForm {...formProps}/>
      <a href="javascript:;" style={{padding: 8}}>进入完整模式 >></a>
    </Modal>
  )
}