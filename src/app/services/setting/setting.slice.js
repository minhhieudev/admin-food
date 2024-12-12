import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getSettings: () => {},
    setSettings: () => {},
    getBankList: () => {},
    getOngTrumService: () => {},
    bulkCreate: () => {},
    removeOngTrumService: () => {},
    getPaymentActivity: () => {},
  },
});

const SettingReducer = SettingSlice.reducer;
export default SettingReducer;

export const SettingActions = SettingSlice.actions;
