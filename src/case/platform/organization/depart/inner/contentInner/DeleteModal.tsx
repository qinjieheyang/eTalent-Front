import React from "react";
import { Modal, Icon, Checkbox, List } from "antd";

const onCheckAllChange = () =>{

}

const onCheckChange = () =>{

}



interface IDeleteModalProps{
  title?: string;
  visible: boolean;
  confirmLoading: boolean;
  onOk: () => void;
  onCancel: () => void;
  indeterminate: boolean;
  checkAll: boolean;
  checkedList: any[];
}

const DeleteModal = (props: IDeleteModalProps) => {
  const { title = "确认删除", visible, confirmLoading, onOk, onCancel, indeterminate, checkedList, checkAll} = props;

  const modalProps = { title, visible, confirmLoading, onOk, onCancel }

  const checkProps = {indeterminate, checkedList, checkAll}

  return (
    <Modal {...modalProps}>
      <p style={{lineHeight: "24px"}}>
        <Icon type="question-circle" theme="filled" style={{color: "#FFD532", fontSize: 20, verticalAlign:"text-top"}}/>
        <span style={{fontWeight: "bold", marginLeft: 16}}>确认删除下表选中的机构吗？</span>
      </p>
      <div>
        <p style={{paddingLeft: 24}}>
          待删除机构：
        </p>
        <List
          header={
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              全选
            </Checkbox>
          }
          bordered
          dataSource={checkedList}
          renderItem={item => (
            <List.Item>
              <Checkbox
                onChange={onCheckChange}
                defaultChecked ={item.checked}
              >
                {item.name}
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  )
}

export default DeleteModal;