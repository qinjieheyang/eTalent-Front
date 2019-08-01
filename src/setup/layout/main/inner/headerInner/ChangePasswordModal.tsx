import { Form, Input, Modal } from "antd";
import * as React from "react";

const FormItem = Form.Item;
export interface IChangePasswordModalProps {
  form: any;
  visible: boolean;
  onCancel: () => void;
  onLoginOff: () => void;
}

class ChangePasswordModal extends React.Component<IChangePasswordModalProps> {
  constructor(props: IChangePasswordModalProps) {
    super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    return (
      <Modal
        visible={this.props.visible}
        title={"修改密码"}
        width={"30%"}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Form className="login-form">
          <FormItem {...formItemLayout} label="旧密码" hasFeedback={true}>
            {getFieldDecorator("originPassword", {
              rules: [
                {
                  required: true,
                  message: "必填"
                }
              ]
            })(<Input type="password" placeholder={"旧密码"} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="新密码" hasFeedback={true}>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "必填"
                }
              ]
            })(<Input type="password" placeholder={"新密码"} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认新密码" hasFeedback={true}>
            {getFieldDecorator("rePassword", {
              rules: [
                {
                  required: true,
                  message: "必填"
                },
                {
                  validator: this.checkRePassword
                }
              ]
            })(<Input type="password" placeholder={"请再次输入新密码"} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }

  private handleCancel = () => {
    this.props.onCancel();
    this.props.form.resetFields();
  };

  private handleOk = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (!err) {
        if (values.password !== values.rePassword) {
          // CF.UtilMessage.showMessage({
          //   content: "您两次输入的新密码不一致",
          //   type: CF.UtilMessage.Type.error
          // });
          return;
        }
        // await CF.HttpDefault.post("api/update_password", values);

        // CF.UtilMessage.showMessage({
        //   content: "密码修改成功",
        //   type: CF.UtilMessage.Type.success
        // });
        this.props.onLoginOff();
      }
    });
  };

  private checkRePassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("必须与“新密码”一致");
    } else {
      callback();
    }
  };
}
const ChangePasswordModalPage = Form.create<IChangePasswordModalProps>()(
  ChangePasswordModal
);
export default ChangePasswordModalPage;
