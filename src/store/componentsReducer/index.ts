import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { ComponentsPropsType } from "../../components/QuestionComponents";
import { ComponentState } from "react";
// 組件信息的數據類型 單個組件的屬性
export type ComponentsInfoType = {
  fe_id: string; // 前端編碼的id
  type: string; // 組件類型
  title: string; // 組件標題
  props: ComponentsPropsType; // 組件的屬性
};
// 當前模塊存儲的列表
export type ComponentsStateType = {
  selectedId: string; //點擊玩後紀錄組件的id
  componentList: ComponentsInfoType[];
};
const INIT_STATE: ComponentsStateType = {
  selectedId: "", //被選中的組件id
  componentList: [],
  //其他擴展
};
export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置組件列表
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) => {
      return action.payload;
    },
    //immer改變的不可變數據的寫法 本質不變
    //修改selectedId
    // changeSelectedId: (state:ComponentsStateType,action:PayloadAction<string>) => {

    // }
    changeSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    // 新增組件
    addComponent: (
      draft: ComponentsStateType,
      action: PayloadAction<ComponentsInfoType>,
    ) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = draft;

      const index = componentList.findIndex(
        (item) => item.fe_id === selectedId,
      );

      if (index < 0) {
        // ❗ 沒選中任何組件 → 加在最後
        componentList.push(newComponent);
      } else {
        // ✅ 插入在選中組件後
        componentList.splice(index + 1, 0, newComponent);
      }

      // ✅ 同步更新當前選中 id
      draft.selectedId = newComponent.fe_id;
    },
    // 修改組件屬性
    changeComponentProps: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentsPropsType }>,
    ) => {
      const { fe_id, newProps } = action.payload;

      const curComp = draft.componentList.find((comp) => comp.fe_id === fe_id);
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        };
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
} = componentsSlice.actions;
export default componentsSlice.reducer;
