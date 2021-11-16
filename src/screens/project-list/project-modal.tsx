import React from "react";
import { Drawer, Button } from "antd";

interface IProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = (props: IProps) => {
  return (
    <Drawer
      visible={props.projectModalOpen}
      width={"100%"}
      onClose={props.onClose}
    >
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
