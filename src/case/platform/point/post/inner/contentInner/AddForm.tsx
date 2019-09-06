import React from "react";
import { Form } from "antd";
import Framework from "src/framework/Framework";
import { FormComponentProps } from 'antd/lib/form/Form';
const { Inputs } = Framework.Com.Forms;

const { TextInput, SelectInput, SelectTreeInput  } = Inputs;

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

interface IAddFormProps extends FormComponentProps {
  
}

const AddForm = Form.create({ name: 'normal_login' })((props: IAddFormProps) => {
  const { getFieldDecorator } = props.form;
  // const onChange = (fieldName:string, value: string) =>{
  //   console.log(fieldName, value)
  // }

  // const usernameError = isFieldTouched('username') && getFieldError('username');
  // const passwordError = isFieldTouched('password') && getFieldError('password');

  return (
    <Form {...FormItemLayout} labelAlign="left">
      <TextInput formItem ={{ label :"机构编码" }}
        fieldName="departNo" 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        max = {100}
      />
      <TextInput formItem ={{ label :"机构名称" }}
        fieldName="departName" 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        max = {100}
      />
      <SelectInput formItem ={{ label :"机构类型" }}
        fieldName="departType"
        getFD = {getFieldDecorator} 
        isRequired = {true}
        option = {[{title:"集团", value: 1},{title:"单位", value: 2},{title:"部门", value: 3}]}
        value = {1}
      />
      <SelectTreeInput formItem ={{ label :"上级机构" }}
        fieldName="parentId" 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        selectItems={selectTreeData}
        value = {"1-1"}
      />
      <TextInput formItem ={{ label :"机构负责人" }}
        fieldName="departLeader" 
        getFD = {getFieldDecorator} 
        max = {100}
      />
    </Form>
  )
})



export default  AddForm;