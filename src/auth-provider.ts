//  在真实环境中，如果使用firebase这张第三方auth服务的话，本文件不需要开发
import { User } from "screens/project-list/search-panel";
import { ILogin } from "unauthenticated-app/login";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorgeKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorgeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorgeKey, user.token || "");
  return user;
};

// 登录promise
export const login = (data: ILogin) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 注册promise
export const register = (data: ILogin) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 登出
export const logout = async () =>
  window.localStorage.removeItem(localStorgeKey);
