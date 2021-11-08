import React from "react";
import { Input, Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/use-select";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  origanization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
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
        {/* @ts-ignore */}
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value: number | undefined) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
