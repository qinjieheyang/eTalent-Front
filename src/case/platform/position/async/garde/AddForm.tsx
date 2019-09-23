import React from "react";
import { Form } from "antd";
import Framework from "src/framework/Framework";
import { FormComponentProps } from 'antd/lib/form/Form';
const { Inputs } = Framework.Com.Forms;

const { TextInput } = Inputs;

const FormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface IAddFormProps extends FormComponentProps {}

const AddForm = Form.create({ name: 'normal_login' })((props: IAddFormProps) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form {...FormItemLayout}>
      <TextInput formItem ={{ label :"职等名称" }}
        fieldName="positionGroupName " 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        max = {100}
      />
      <TextInput formItem ={{ label :"职等说明" }}
        fieldName="positionGroupName " 
        getFD = {getFieldDecorator} 
        max = {100}
      />
    </Form>
  )
})



export default  AddForm;