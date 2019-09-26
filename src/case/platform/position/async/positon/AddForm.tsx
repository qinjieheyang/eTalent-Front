import React from "react";
import { Form } from "antd";
import Framework from "src/framework/Framework";

import { FormComponentProps } from 'antd/lib/form/Form';
const { Inputs } = Framework.Com.Forms;



const { TextInput, SelectInput, SelectTreeInput } = Inputs;

const FormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface IAddFormProps extends FormComponentProps { }

const AddForm = Form.create({ name: 'normal_login' })((props: IAddFormProps) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form {...FormItemLayout}>
      <SelectInput formItem={{ label: "所属职位族" }}
        fieldName="positionGroupName"
        getFD={getFieldDecorator}
        isRequired={true}
        options={[{ label: "研发族", value: 1 }, { label: "销售族", value: 2 }, { label: "实施族", value: 3 }]}
        value={1}
      />
      <TextInput formItem={{ label: "职位名称" }}
        fieldName="positionName"
        getFD={getFieldDecorator}
        isRequired={true}
        max={100}
      />
      <SelectTreeInput formItem={{ label: "职级" }}
        fieldName="positionLevel"
        getFD={getFieldDecorator}
        treeCheckable={true}
        selectItems={[{ id: 1, name: "1级" }, { id: 2, name: "2级" }, { id: 3, name: "3级" }]}
      />
      <SelectTreeInput formItem={{ label: "职等" }}
        fieldName="positionGrade"
        getFD={getFieldDecorator}
        treeCheckable={true}
        selectItems={[{ id: 1, name: "专员" }, { id: 2, name: "主管" }, { id: 3, name: "经理" }]}
      />
    </Form>
  )
})



export default AddForm;