import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerUsername: "",
};

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    checkLogin: (state, { payload }) => {},
    setIsLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
    setRegisterUsername: (state, { payload }) => {
      state.registerUsername = payload;
    },
    checkBioLink: (state, { payload }) => {},
    register: (state, { payload }) => {},
  },
});

const RegisterReducer = RegisterSlice.reducer;
export default RegisterReducer;

export const RegisterActions = RegisterSlice.actions;

export const RegisterSelectors ={
  isLogin: (state) => state.auth.isLogin,
  registerUsername: (state) => state.auth.registerUsername,
};

