import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const PartnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    getBalance: () => {},
  },
});

const PartnerReducer = PartnerSlice.reducer;
export default PartnerReducer;

export const PartnerActions = PartnerSlice.actions;
