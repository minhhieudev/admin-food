import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  system: undefined,
  order: undefined,
  money: undefined,
  revenue: undefined,
  pie: undefined,
  line: undefined,
};

const DashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getSystemList: () => {},
    getOrder: () => {},
    setOrder: (state, { payload }) => {
      state.order = payload;
    },
    getMoney: () => {},
    setMoney: (state, { payload }) => {
      state.money = payload;
    },
    getRevenue: () => {},
    setRevenue: (state, { payload }) => {
      state.revenue = payload;
    },
    setSystemList: (state, { payload }) => {
      state.system = payload;
    },
    getDataPie: () => {},
    setPieList: (state, { payload }) => {
      state.pie = payload;
    },
    getDataLine: () => {},
    setLineList: (state, { payload }) => {
      state.line = payload;
    },
    /*
      Người viết: Đinh văn Thành
      Ngày viết: 06-06-2024
      Chức năng: - call hàm getCustomerOrder từ saga để lấy dữ liệu từ phía server 
    */
    getCustomerOrder: () => {},
    /*============= END ==================*/
    /*
      Người viết: Đinh văn Thành
      Ngày viết: 06-06-2024
      Chức năng: - call hàm getServiceList từ saga để lấy dữ liệu từ phía server 
    */
    getServiceList: () => {},
    /*============= END ==================*/
    /*
      Người viết: Đinh văn Thành
      Ngày viết: 06-06-2024
      Chức năng: - call hàm getCustomerDeposit từ saga để lấy dữ liệu từ phía server 
    */
    getCustomerDeposit: () => {},
    /*============= END ==================*/
  },
});

const DashBoardReducer = DashBoardSlice.reducer;
export default DashBoardReducer;

export const DashBoardActions = DashBoardSlice.actions;
export const DashBoardSelectors = {
  statisticalList: (state) => state.dashboard.statisticalList,
  order: (state) => state.dashboard.order,
  money: (state) => state.dashboard.money,
  revenue: (state) => state.dashboard.revenue,
  system: (state) => state.dashboard.system,
  pie: (state) => state.dashboard.pie,
  line: (state) => state.dashboard.line,
};
