import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import { UserStateType } from "../store/userReducer";
export type Statetype = {
  user: UserStateType;
};
// Create a Redux store with any reducers you need
export default configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    // 擴展問的信息
  },
});
