import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isBlur: false,
  isInit: false,
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, payload) => {
      state.isLoading = payload.payload;
    },
    setBlur: (state, payload) => {
      state.isBlur = payload.payload;
    },
    setInit: (state, payload) => {
      state.isInit = payload.payload;
    },
  },
});

const AppReducer = AppSlice.reducer;
export default AppReducer;

export const AppActions = AppSlice.actions;

export const AppSelectors = {
  isLoading: (state) => state.app.isLoading,
  isBlur: (state) => state.app.isBlur,
  isInit: (state) => state.app.isInit,
};
