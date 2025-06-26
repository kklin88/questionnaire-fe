import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import { UserStateType } from "../store/userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
};
// Create a Redux store with any reducers you need
export default configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    // 組件列表數據 (複雜，undo/redo 功能)
    components: componentsReducer,
    // 問卷信息數據 title, desc
  },
});
