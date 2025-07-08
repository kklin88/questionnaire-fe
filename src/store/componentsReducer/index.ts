import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { getNextSelectedId } from "./utils";
import { ComponentsPropsType } from "../../components/QuestionComponents";
import cloneDeep from "lodash.clonedeep";
// 組件信息的數據類型 單個組件的屬性
export type ComponentsInfoType = {
  fe_id: string; // 前端編碼的id
  type: string; // 組件類型
  title: string; // 組件標題
  isHidden?: boolean; // 是否隱藏
  isLocked?: boolean; // 是否鎖定
  props: ComponentsPropsType; // 組件的屬性
};
// 當前模塊存儲的列表
export type ComponentsStateType = {
  selectedId: string; //點擊玩後紀錄組件的id
  componentList: ComponentsInfoType[];
  copiedComponent: ComponentsInfoType | null;
};
const INIT_STATE: ComponentsStateType = {
  selectedId: "", //被選中的組件id
  componentList: [],
  //其他擴展
  copiedComponent: null,
};
export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置組件列表
    resetComponents: (
      _state: ComponentsStateType,
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
    // 刪除選中的組件
    removeSelectedComponent: (draft: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = draft;
      // 重新計算 selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      draft.selectedId = newSelectedId;
      const index = componentList.findIndex((item) => item.fe_id === removeId);
      componentList.splice(index, 1);
    },
    // 隱藏 顯示組件
    changeComponentHidden: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList = [] } = draft;
      const { fe_id, isHidden } = action.payload;
      // 重新計算selectedId
      let newSelectedId = "";
      // 要隱藏
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        // 要顯示
        newSelectedId = fe_id;
      }

      draft.selectedId = newSelectedId;
      const curComp = componentList.find((comp) => comp.fe_id === fe_id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },
    // 鎖定組件
    toggleComponentLock: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>,
    ) => {
      const { componentList = [] } = draft;
      const { fe_id } = action.payload;
      const curComp = componentList.find((comp) => comp.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    // 拷貝當前選中的組件
    copySelectedComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;

      const selectedComponent = componentList.find(
        (comp) => comp.fe_id === selectedId,
      );
      if (selectedComponent == null) return;
      if (selectedComponent) {
        draft.copiedComponent = cloneDeep(selectedComponent);
      }
    },
    // 貼上剪貼簿的組件
    pasteCopiedComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList = [], copiedComponent } = draft;
      if (copiedComponent == null) return;

      // 創建新的組件副本並生成新的 fe_id
      const newComponent = {
        ...copiedComponent,
        fe_id: nanoid(), // 生成新的唯一 ID
      };

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
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
