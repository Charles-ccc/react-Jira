import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
export interface ILogin {
  username: string;
  password: string;
}

export const RegisterScreen = () => {
  const { register } = useAuth();

  // FormEventHandler<HTMLFormElement>
  // const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
  //   register({ username, password });
  // };
  const handleSubmit = (values: ILogin) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="用户名"
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="text" id={"password"} placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
