import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
export interface ILogin {
  username: string;
  password: string;
}

export const LoginScreen = () => {
  const { login } = useAuth();

  // FormEventHandler<HTMLFormElement>
  // const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
  //   login({ username, password });
  // };
  const handleSubmit = (values: ILogin) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="text" id={"password"} placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
