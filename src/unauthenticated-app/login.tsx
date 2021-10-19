import React from "react";
import { useAuth } from "context/auth-context";
export interface ILogin {
  username: string;
  password: string;
}

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // FormEventHandler<HTMLFormElement>
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
