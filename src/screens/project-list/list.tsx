import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  const columnsData = [
    {
      title: "名称",
      dataIndex: "name",
      // @ts-ignore
      sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare排序中文字符
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      // @ts-ignore
      render(value, project) {
        return (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name ||
              "未知"}
          </span>
        );
      },
    },
    {
      title: "部门",
      // @ts-ignore
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无"}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columnsData} dataSource={list} />;
};
