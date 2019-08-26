import React from "react";
import { Form } from "antd";
import Framework from "src/framework/Framework";
import { FormComponentProps } from 'antd/lib/form/Form';
const { Inputs } = Framework.Com.Forms;

const { TextInput  } = Inputs;

const FormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

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
    <Form {...FormItemLayout}>
      <TextInput formItem ={{ label :"机构编码" }}
        fieldName="departName" 
        getFD = {getFieldDecorator} 
        isRequired = {true}
        max = {100}
      />
    </Form>
  )
})



export default  AddForm;