import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  const panelProps = {
    param,
    setParam,
    users: users || [],
  };
  const lisetProps = {
    loading: isLoading,
    dataSource: list || [],
    users: users || [],
  };
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel {...panelProps} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List {...lisetProps} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
