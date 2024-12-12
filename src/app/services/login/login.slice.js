import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: undefined,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkLogin: (state, { payload }) => {},
    changePassword: (state, { payload }) => {},
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

const LoginReducer = LoginSlice.reducer;
export default LoginReducer;

export const LoginActions = LoginSlice.actions;

export const LoginSelectors = {};
