// 代码切片
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
// state 是指根级状态树，
// projectList 是指在 store/index.tsx 定义在rootReducer中的 切片状态树
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
