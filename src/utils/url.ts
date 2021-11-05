import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

// 返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // Object.fromEntries(searchParams) 读取现在的url参数，并变成普通对象
      // 用新的 ...params 覆盖它
      // cleanObject去清除掉空和undefined的
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
