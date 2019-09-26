import React from "react";
import { Form, Col, Row } from "antd";
import Framework from "src/framework/Framework";
import { FormComponentProps } from 'antd/lib/form/Form';
const { Inputs } = Framework.Com.Forms;

const { TextInput, RadioGroupInput, DateInput, SelectInput, SelectTreeInput } = Inputs;

const FormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

interface IAddFormProps extends FormComponentProps {

}

const AddForm = Form.create({ name: 'normal_login' })((props: IAddFormProps) => {
  const { getFieldDecorator } = props.form;

  return (
    <Form {...FormItemLayout}>
      <Row>
        <Col span={12}>
          <TextInput formItem={{ label: "姓名" }}
            fieldName="userName"
            getFD={getFieldDecorator}
            isRequired={true}
            max={100}
          />
        </Col>
        <Col span={12}>
          <RadioGroupInput formItem={{ label: "性别" }}
            fieldName="gender"
            getFD={getFieldDecorator}
            isRequired={true}
            options={[{ label: "男", value: "1" }, { label: "女", value: "2" }]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <SelectTreeInput formItem={{ label: "单位" }}
            fieldName="businessUnitId"
            getFD={getFieldDecorator}
            isRequired={true}
            selectItems={[{id:1, name: "xxx"}]}
          />
        </Col>
        <Col span={12}>
          <SelectTreeInput formItem={{ label: "部门" }}
            fieldName="orgId"
            getFD={getFieldDecorator}
            isRequired={true}
            selectItems={[{id:1, name: "xxx"}]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <SelectInput formItem={{ label: "职位" }}
            fieldName="postId"
            getFD={getFieldDecorator}
            isRequired={true}
            options={[{ label: "男", value: "1" }, { label: "女", value: "2" }]}
          />
        </Col>
        <Col span={12}>
          <SelectInput formItem={{ label: "岗位" }}
            fieldName="postId"
            getFD={getFieldDecorator}
            isRequired={true}
            options={[{ label: "男", value: "1" }, { label: "女", value: "2" }]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TextInput formItem={{ label: "直接上级" }}
            fieldName="userName"
            getFD={getFieldDecorator}
            isRequired={true}
            max={100}
          />
        </Col>
        <Col span={12}>
          <DateInput formItem={{ label: "入职日期" }}
            fieldName="hiredate"
            getFD={getFieldDecorator}
            isRequired={true}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <TextInput formItem={{ label: "联系电话" }}
            fieldName="tel"
            getFD={getFieldDecorator}
            isRequired={true}
            max={100}
          />
        </Col>
        <Col span={12}>
          <TextInput formItem={{ label: "联系电话" }}
            fieldName="email"
            getFD={getFieldDecorator}
            isRequired={true}
            max={100}
          />
        </Col>
      </Row>
    </Form>
  )
})



export default AddForm;