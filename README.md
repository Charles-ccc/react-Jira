### 项目笔记

react-router 和 react-router-dom 的关系类似于 react 和 react-dom/react-native

react hooks
基本类型，可以放在依赖里。组件状态，可以放在依赖里。非组件状态的对象，绝不可以放在依赖里。

向 useState 中直接传入函数的含义是执行 惰性初始化。所以如果要用 useState 保存函数的话，不能直接传入函数。

component composition

自定义 hooks 返回方法的时候，需要使用 useCallback 包裹
