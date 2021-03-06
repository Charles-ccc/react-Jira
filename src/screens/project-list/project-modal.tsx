import React from "react";
import { Drawer, Button } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer visible={projectModalOpen} width={"100%"} onClose={close}>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
