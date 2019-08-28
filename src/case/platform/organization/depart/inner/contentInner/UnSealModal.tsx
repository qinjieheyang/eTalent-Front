import * as React from "react";
import { Modal, Icon } from "antd";

import Framework from "src/framework/Framework";

const { CheckBoxList } = Framework.Com.CheckBox;

interface IUnSealModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const checkedList = [
  {
    value: 1,
    name: "xxx"
  },
  {
    value: 2,
    name: "yyy"
  },
]


const UnSealModal = (props: IUnSealModalProps) => {
  const { title = "确认解封", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  // const checkProps = {indeterminate, checkedList, checkAll}

  return (
    <Modal {...modalProps}>
      <p style={{lineHeight: 1.5}}>
        <Icon type="question-circle" theme="filled" style={{color: "#FFD532", fontSize: 20, verticalAlign:"text-top"}}/>
        <span style={{fontWeight: "bold", marginLeft: 8}}>确认解封下表选中的机构吗？</span>
      </p>
      <div>
        <CheckBoxList items={checkedList}/>
      </div>
    </Modal>
  )
}

export default UnSealModal;