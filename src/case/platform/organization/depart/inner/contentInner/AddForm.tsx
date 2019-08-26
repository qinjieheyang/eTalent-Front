import React from "react";
import { Form } from "antd";
import Framework from "src/framework/Framework";

const { Input } = Framework.Com.Forms;

const { TextInput } = Input;

// const FormItemLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 8 },
// };

interface IAddFormProps{

}

// const getFD = (fieldName, fieldProps) =>{

//   return () => {

//   }
// }

const AddModal = (props: IAddFormProps) => {

  return (
    <Form>
      <TextInput fieldName="机构编码"  getFD= {{}} ></TextInput>
    </Form>
  )
}

export default AddModal;