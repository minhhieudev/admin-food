import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerList: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  searchUsername: "",
  customerDetail: undefined,
  paymentActivities: [],
  paginationPaymentActivities: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    recharge: (state, { payload }) => {},
    getCustomers: () => {},
    setCustomers: (state, { payload }) => {
      state.customerList = payload;
    },
    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
    setSearchUsername: (state, { payload }) => {
      state.searchUsername = payload;
    },
    getCustomerById: (state, { payload }) => {},
    setCustomerDetail: (state, { payload }) => {
      state.customerDetail = payload;
    },
    getPaymentActivities: (state, { payload }) => {},
    setPaymentActivities: (state, { payload }) => {
      state.paymentActivities = payload;
    },
    setPaginationPaymentActivities: (state, { payload }) => {
      state.paginationPaymentActivities = payload;
    },
    resetSession: (state) => {
      state.searchUsername = "";
      state.customerList = [];
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },
    block: (state, { payload }) => {},
    restore: (state, { payload }) => {},
  },
});

const CustomerReducer = CustomerSlice.reducer;
export default CustomerReducer;

export const CustomerActions = CustomerSlice.actions;
export const CustomerSelectors = {
  customerList: (state) => state.customer.customerList,
  pagination: (state) => state.customer.pagination,
  searchUsername: (state) => state.customer.searchUsername,
  customerDetail: (state) => state.customer.customerDetail,
  paymentActivities: (state) => state.customer.paymentActivities,
  paginationPaymentActivities: (state) =>
    state.customer.paginationPaymentActivities,
};
