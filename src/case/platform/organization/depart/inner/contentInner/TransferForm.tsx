import React from "react";
import { Form } from "antd";
import Framework from "src/framework/Framework";
import { FormComponentProps } from 'antd/lib/form/Form';
const { Inputs } = Framework.Com.Forms;

const { TextInput, CheckBoxListInput, SelectTreeInput  } = Inputs;

const FormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const selectTreeData = [
  {
    name:"集团xxx",
    id: "1",
    children: [
      {
        name:"单位xxx",
        id: "1-1",
        children: [
          {
            name:"部门xxx",
            id: "1-1-1"
          }
        ]
      }
    ]
  }
]

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

interface ITransferFormProps extends FormComponentProps {
  
}

const TransferForm = Form.create({ name: 'normal_login' })((props: ITransferFormProps) => {
  const { getFieldDecorator } = props.form;
  // const onChange = (fieldName:string, value: string) =>{
  //   console.log(fieldName, value)
  // }

  // const usernameError = isFieldTouched('username') && getFieldError('username');
  // const passwordError = isFieldTouched('password') && getFieldError('password');

  return (
    <Form {...FormItemLayout} labelAlign="left">
      <SelectTreeInput formItem ={{ label :"目标机构" }}
        fieldName="parentId" 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        selectItems={selectTreeData}
        value = {"1-1"}
      />
      <CheckBoxListInput formItem ={{ label :"待划转机构" }}
        fieldName="departList" 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        items = {checkedList}
      />
    </Form>
  )
})



export default  TransferForm;