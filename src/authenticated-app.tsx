// 登录状态的app
import { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { ReactComponent as SortwareLogo } from "./assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

/**
 * grid 和 flex 的应用场景
 * 1. 要考虑一维布局（flex)还是二维布局(grid)
 * 2. 是从内容出发（flex）还是布局出发（grid）
 */
export const AuthenticatedApp = () => {
  const [projectModelOpen, setProjectModalOpen] = useState<boolean>(false);
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            type={"link"}
            onClick={() => setProjectModalOpen(true)}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding
                      type={"link"}
                      onClick={() => setProjectModalOpen(true)}
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModelOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <BackLogo onClick={resetRoute}>
          <SortwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </BackLogo>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const BackLogo = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
