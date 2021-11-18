import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjectsSearchParam } from "./util";
import { ButtonNoPadding, Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParam();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();
  const dispatch = useDispatch();
  const panelProps = {
    param,
    setParam,
    users: users || [],
  };
  const lisetProps = {
    loading: isLoading,
    dataSource: list || [],
    users: users || [],
    refresh: retry,
  };
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel {...panelProps} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List {...lisetProps} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
