import * as React from "react";
import { Modal, Icon } from "antd";

import Framework from "src/framework/Framework";

const { CheckBoxList } = Framework.Com.CheckBox;

interface IDeleteModalProps{
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


const DeleteModal = (props: IDeleteModalProps) => {
  const { title = "确认删除", visible, confirmLoading, onOk, onCancel} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  // const checkProps = {indeterminate, checkedList, checkAll}

  return (
    <Modal {...modalProps}>
      <p style={{lineHeight: "24px"}}>
        <Icon type="question-circle" theme="filled" style={{color: "#FFD532", fontSize: 20, verticalAlign:"text-top"}}/>
        <span style={{fontWeight: "bold", marginLeft: 16}}>确认删除下表选中的机构吗？</span>
      </p>
      <div>
        {/* <p>待删除机构：</p> */}
        <CheckBoxList items={checkedList}/>
      </div>
    </Modal>
  )
}

export default DeleteModal;