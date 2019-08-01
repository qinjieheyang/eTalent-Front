import { Button, Form, Icon, Input, Row } from "antd";
import * as React from "react";

interface IProps {
    form: any;
    onLoginSubmit: (values: any) => void;
}

class Login extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return <div style={{ paddingTop: "7em", height: "100%" }}>{this.getForm()}</div>;
    }

    private getForm = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ textAlign: "center" }}>
                <div style={{ maxWidth: "300px", padding: "30px", margin: "0 auto" }}>
                    <Form>
                        <Form.Item>
                            {getFieldDecorator("loginName", {
                                rules: [{ required: true, message: "请输入用户名!" }]
                            })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                    onKeyDown={this.handleKeyDown}
                                    placeholder="登录用户名"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("password", {
                                rules: [{ required: true, message: "请输入密码!" }]
                            })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                    type="password"
                                    onKeyDown={this.handleKeyDown}
                                    placeholder="登录密码"
                                />
                            )}
                        </Form.Item>

                        <Row>
                            <Button style={{ width: "100%" }} onClick={this.handleLoginSubmit} type="primary">
                                登录
                            </Button>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    };

    private handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            this.handleLoginSubmit(e);
        }
    };

    private handleLoginSubmit = (e: any) => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.props.onLoginSubmit(values);
            }
        });
    };
}

const XLogin = Form.create<IProps>()(Login);
export { XLogin };
