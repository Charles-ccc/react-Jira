import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const client = useHttp();
  const debouncedParam = useDebounce(param, 1000);

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useEffect(() => {
    client("users").then(setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelProps = {
    param,
    setParam,
    users,
  };
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel {...panelProps} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list} users={users} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
