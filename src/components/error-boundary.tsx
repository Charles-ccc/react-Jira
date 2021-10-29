import React, { Component, ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// React.PropsWithChildren<{添加其他类型}> 可以自动加入children类型
interface IProps {
  children: ReactNode;
  fallbackRender: FallbackRender;
}
interface IState {
  error: Error | null;
}

export class ErrorBoundary extends Component<IProps, IState> {
  state = {
    error: null,
  };
  // 当子组件抛出异常，这边回接收到并调用
  static getDerivedStateFromProps(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
