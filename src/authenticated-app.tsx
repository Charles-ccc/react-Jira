// 登录状态的app
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <header>
        <button onClick={logout}>登出</button>
      </header>
      <main>
        <ProjectListScreen />
      </main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;
