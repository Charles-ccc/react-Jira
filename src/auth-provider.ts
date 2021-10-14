//  在真实环境中，如果使用firebase这张第三方auth服务的话，本文件不需要开发
import { User } from "screens/project-list/search-panel";
import { ILogin } from "screens/login";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorgeKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorgeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorgeKey, user.token || "");
  return user;
};

export const login = (data: ILogin) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      handleUserResponse(await res.json());
    }
  });
};

export const register = (data: ILogin) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      handleUserResponse(await res.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorgeKey);
