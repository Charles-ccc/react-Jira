import { useEffect, useState, useRef } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// {[key: string]: unknown} 表示只需要键值对的类型
// 如果换成object，则会涵盖很多其他类型，参考typeof的object结果
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const debounce = (func: () => void, delay?: number) => {
  let timer: any;
  return (...param: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      // @ts-ignore
      func(...param);
    }, delay);
  };
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const _value = [...value];
      _value.splice(index, 1);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  // capture value
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keepOnUnmount, oldTitle]);
};
