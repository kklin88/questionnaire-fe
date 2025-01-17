import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
  username: string;
  nickname: string;
};
const INIT_STATE: UserStateType = { username: "", nickname: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>,
    ) => {
      return action.payload; //設置username和nickname 簡單返回
    },
    logoutReducer: () => INIT_STATE,
  },
});
export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
