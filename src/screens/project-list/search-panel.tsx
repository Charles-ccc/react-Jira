import React from "react";
import { Input, Select, Form } from "antd";

const { Option } = Select;
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  origanization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="负责人"
          onChange={(value) => {
            setParam({
              ...param,
              // @ts-ignore
              personId: value,
            });
          }}
        >
          {users.map((user) => (
            <Option key={user.id} value={String(user.id)}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
