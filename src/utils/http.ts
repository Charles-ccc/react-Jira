import qs from "qs"; // 将对象转换成url的格式 ？AA=aa&BB=bb，或把url参数转为对象
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  // 接口名
  endpoint: string,
  { data, token, headers, ...customConfig }: IConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样，axios可以在返回不为2xx的时候抛出异常，而fetch不会抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // typeof 是指ts中的静态typeof
  // <typeof http> 是一个函数类型的泛型，Parameters可以读出该函数类型的参数类型
  // Utility Type：用泛型给它传入一个其他类型，然后Utility Type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

/** 
// 类型别名type可以定义联合类型，而interface不可以
// interface 没法实现Utility Types
type Person = {
  name: string,
  age: number
}

const xiaoE: Partial<Person> = {name: 'xiaom'} // Partial可以满足定义类型不全
const xiaoN: Partial<Person> = {} // 也可以什么都不传
const mustA: Omit<Person, 'name'> = {age: 18} // Omit第一个参数是基本类型，第二个参数是需要删除的属性名
const mustN: Omit<Person, 'name' | 'age'> = {}
type PersonKeys = keyof Person // 'name' | 'age'
type PersonOnlyName = Pick<Person, 'name'> // 在基础类型中挑选几个组成新的类型
type Age = Exclude<PersonKeys, 'name'> // 返回从联合类型中过滤后剩余的类型

// Partial实现
type Partial<T> = {
  // ? 使得传入的键变为可选
  [P in keyof T]?: T[P]
}
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type Exclude<T, U> = T extends U ? never : T
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
*/
