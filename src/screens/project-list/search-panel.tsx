import React from "react";
import { Input, Select } from "antd";

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
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
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
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
