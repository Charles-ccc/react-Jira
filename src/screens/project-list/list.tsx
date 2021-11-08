import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
// extends TableProps<Project> 扩展性更好
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const columnsData = [
    {
      title: "名称",
      // dataIndex: 'name',
      // @ts-ignore
      render(value, project) {
        // list 是在路由下渲染的，所以这里直接to id，是默认在当前路由下的子路由
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
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
  return <Table pagination={false} columns={columnsData} {...props} />;
};
