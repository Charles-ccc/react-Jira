import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitailState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitailState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  // 向useState中直接传入函数的含义是执行 惰性初始化。所以如果要用useState保存函数的话，不能直接传入函数。
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback((data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  }, []);

  const setError = useCallback((error: Error) => {
    setState({
      error,
      stat: "error",
      data: null,
    });
  }, []);
  // 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry()) {
          run(runConfig?.retry(), runConfig);
        }
      });
      // 此处不能直接更新state，需要使用函数的方式。否则useCallback第二个参数需要依赖，会导致无限循环
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            // 组件已经被挂载
            setData(data);
          }
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          // 直接return error，外部接收不到异常
          return Promise.reject(error);
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时，重新调用一次run，让state刷新
    retry,
    ...state,
  };
};
